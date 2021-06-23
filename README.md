 # Run locally

 * `minikube start --vm=true`
 * `minikube addons enable ingress`
 * `minikube addons enable registry-creds`
 * `minikube addons configure registry-creds`
 * `gradle deployApi`
 * `yarn run ios`
 * `kubectl port-forward --address=0.0.0.0 --namespace=kube-system deployment/ingress-nginx-controller 80:80`
 * `minikube dashboard`

# install metrics server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

#dont think we need. dont run unless dns breaking or something
CoreDNS: `kubeadm upgrade apply v1.8.4 --feature-gates=CoreDNS=true`, minikube: https://github.com/coredns/deployment/tree/master/kubernetes




#kind
https://medium.com/@munza/local-kubernetes-with-kind-helm-dashboard-41152e4b3b3d
  * helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
  * helm install dashboard kubernetes-dashboard/kubernetes-dashboard -n kubernetes-dashboard --create-namespace
  * kubectl apply -f deploy/dashboard.yaml
  * kubectl describe serviceaccount admin-user -n kubernetes-dashboard
  * kubectl describe secret <token> -n kubernetes-dashboard
  * kubectl proxy
