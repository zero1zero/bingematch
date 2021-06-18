deployAll:
	kubectl apply -f deploy/redis.yaml
	kubectl apply -f deploy/postgres.yaml
	kubectl apply -f deploy/lb-deployment.yaml
