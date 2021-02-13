run: 
	gradle build

deploy:
	chmod 400 vestly.pem
	scp -i "vestly.pem" docker-compose.yml ec2-user@ec2-18-236-70-145.us-west-2.compute.amazonaws.com:/home/ec2-user/
	scp -i "vestly.pem" nginx.conf ec2-user@ec2-18-236-70-145.us-west-2.compute.amazonaws.com:/home/ec2-user/
	ssh -i "vestly.pem" ec2-user@ec2-18-236-70-145.us-west-2.compute.amazonaws.com 'echo "TAG=$(TAG)" > .env && sudo docker-compose pull && sudo docker-compose down && sudo docker-compose up -d'

login:
	ssh -i "vestly.pem" ec2-user@ec2-18-236-70-145.us-west-2.compute.amazonaws.com

build: build_ui build_api
	kubectl apply -f deploy/

build_ui:
	cd ui &&\
	docker build -t bingematch-ui . &&\
	docker tag  bingematch-ui:latest 990223444407.dkr.ecr.us-west-2.amazonaws.com/bingematch-ui:latest &&\
	docker push ui/Dockerfile 990223444407.dkr.ecr.us-west-2.amazonaws.com/bingematch-ui:latest

build_api:
	cd api
	docker build -t bingematch-api .
	docker tag bingematch-api:latest 990223444407.dkr.ecr.us-west-2.amazonaws.com/bingematch-api:latest
	docker push 990223444407.dkr.ecr.us-west-2.amazonaws.com/bingematch-api:latest
