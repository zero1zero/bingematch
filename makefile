setup:
	kind create cluster --config=kind.yaml
	echo $(aws ecr get-login-password --region us-west-2) | read pwd | kubectl create secret docker-registry ecr --docker-server=990223444407.dkr.ecr.us-west-2.amazonaws.com --docker-username=AWS --docker-password=$pwd
	kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

dashboard:
	helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
	helm install dashboard kubernetes-dashboard/kubernetes-dashboard -n kubernetes-dashboard --create-namespace
	kubectl apply -f deploy/dashboard.yaml
	kubectl describe serviceaccount admin-user -n kubernetes-dashboard
	echo "http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:dashboard-kubernetes-dashboard:https/proxy/#/workloads?namespace=default"
	echo "kubectl describe secret <token> -n kubernetes-dashboard"

proxy: 
	kubectl proxy

deployAll:
	kubectl apply -f deploy/redis.yaml
	kubectl apply -f deploy/postgres.yaml
	kubectl apply -f deploy/ingress.yaml

