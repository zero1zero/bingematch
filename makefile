delete:
	kind delete cluster --name local

setup: delete
	kind create cluster --config=kind.yaml
	kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
	helm repo add metallb https://metallb.github.io/metallb
	helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
	helm repo update

	sleep 10

	kubectl apply -f deploy/ingress.yaml

	#kubectl create secret generic docker --from-file=.dockerconfigjson=/Users/zack/.docker/config.json --type=kubernetes.io/dockerconfigjson
	kubectl create secret docker-registry docker --docker-server=https://index.docker.io/v2/ --docker-username=zero1zero --docker-password=NZEDgefrJL7aBHkdf2 --docker-email=zack.manning@gmail.com
	kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "docker"}]}'

	#kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.47.0/deploy/static/provider/baremetal/deploy.yaml
# 	kubectl get configmap kube-proxy -n kube-system -o yaml | sed -e "s/strictARP: false/strictARP: true/" | kubectl apply -f - -n kube-system
# 	kubectl get configmap kube-proxy -n kube-system -o yaml | sed -e "s/mode: iptables/mode: "ipvs"/" | kubectl apply -f - -n kube-system
# 	helm install metallb metallb/metallb -f metallb.yaml

	kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/master/manifests/namespace.yaml
	kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"
	kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/master/manifests/metallb.yaml
	kubectl apply -f https://kind.sigs.k8s.io/examples/loadbalancer/metallb-configmap.yaml

	#kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.47.0/deploy/static/provider/baremetal/deploy.yaml
 	#helm install ingress-nginx ingress-nginx/ingress-nginx
	kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml

dashboard:
	helm repo add k8s-dashboard https://kubernetes.github.io/dashboard
	helm install kubernetes-dashboard k8s-dashboard/kubernetes-dashboard --version 4.2.0
	kubectl patch serviceaccount kubernetes-dashboard -p '{"imagePullSecrets": [{"name": "docker"}]}'
	kubectl apply -f deploy/dashboard.yaml
	kubectl describe serviceaccount admin-user -n default
	make dashboardCreds
	#kubectl -n default port-forward `kubectl get pods -n default -l "app.kubernetes.io/name=kubernetes-dashboard,app.kubernetes.io/instance=kubernetes-dashboard" -o jsonpath="{.items[0].metadata.name}"` 8443:8443

dashboardCreds:
	kubectl describe secret `kubectl describe serviceaccount admin-user -n default| grep -o 'admin-user-token-.*' | head -n 1` -n default

deployInfra:
	kubectl apply -f deploy/postgres.yaml

auth:
	kubectl delete secret --ignore-not-found ecr
	kubectl create secret docker-registry ecr --docker-server=990223444407.dkr.ecr.us-west-2.amazonaws.com --docker-username=AWS --docker-password `aws ecr get-login-password --region us-west-2`

deployApi: auth
	gradle deployApi

fresh: setup auth
	make deployInfra 
	sleep 10
	make dashboard
	make deployApi

#screen -ls | grep detached | cut -d. -f1 | awk '{print $1}' | xargs kill
#kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
#kubectl apply -f deploy/ingress.yaml
