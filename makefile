version := local$(shell bash -c 'echo $$RANDOM')

login:
	aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 990223444407.dkr.ecr.us-west-2.amazonaws.com

deployApi: login
	./gradlew shadowJar
	docker build -f api/Dockerfile -t bingematch-api:${version} api
	docker tag bingematch-api:${version} 990223444407.dkr.ecr.us-west-2.amazonaws.com/bingematch-api:${version}
	docker push 990223444407.dkr.ecr.us-west-2.amazonaws.com/bingematch-api:${version}
	#replace version in deployment
	sed 's/VERSION/${version}/g' deploy/api-deployment.yaml > /tmp/api-deployment-${version}.yaml
	kubectl apply -f /tmp/api-deployment-${version}.yaml

deployAll:
	kubectl apply -f deploy/redis-deployment.yaml
	kubectl apply -f deploy/lb-deployment.yaml

minikube:
	#minikube delete
	minikube start --vm=true
	minikube addons enable ingress
	minikube addons enable registry-creds
	minikube addons configure registry-creds
	#kubectl proxy --address='0.0.0.0' --disable-filter=true
	#minikube tunnel &
	#minikube dashboard &
