version := local$(shell bash -c 'echo $$RANDOM')

deployAll:
	kubectl apply -f deploy/api-deployment.yaml
	kubectl apply -f deploy/redis-deployment.yaml
	kubectl apply -f deploy/lb-deployment.yaml

minikube:
	#minikube delete
	minikube start --vm=true
	minikube addons enable ingress
	minikube addons enable registry-creds
	minikube addons configure registry-creds
	#kubectl port-forward --address 0.0.0.0 service/api 80:8080
	#minikube tunnel &
	#minikube dashboard &
