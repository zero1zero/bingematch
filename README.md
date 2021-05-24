 # Run locally

 * `minikube start`
 * `minikube addons configure registry-creds`
 * `kubectl port-forward --address 0.0.0.0 service/api 80:8080`
 * `make deployApi` (`make deployApi version=test` if you want to specify version)
 * `yarn run ios`
 * `minikube dashboard`
