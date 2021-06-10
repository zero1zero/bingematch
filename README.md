 # Run locally

 * `minikube start --vm=true`
 * `minikube addons enable ingress`
 * `minikube addons configure registry-creds`
 * `gradle deployApi`
 * `yarn run ios`
 * `kubectl port-forward --address=0.0.0.0 --namespace=kube-system deployment/ingress-nginx-controller 80:80`
 * `minikube dashboard`
