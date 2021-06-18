 # Run locally

 * `minikube start --vm=true`
 * `minikube addons enable ingress`
 * `minikube addons enable registry-creds`
 * `minikube addons configure registry-creds`
 * `gradle deployApi`
 * `yarn run ios`
 * `kubectl port-forward --address=0.0.0.0 --namespace=kube-system deployment/ingress-nginx-controller 80:80`
 * `minikube dashboard`


#dont think we need. dont run unless dns breaking or something
CoreDNS: `kubeadm upgrade apply v1.8.4 --feature-gates=CoreDNS=true`, minikube: https://github.com/coredns/deployment/tree/master/kubernetes
