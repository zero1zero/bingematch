run: 
	gradle build
	docker-compose up --build

deploy:
	chmod 400 vestly.pem
	scp -i "vestly.pem" docker-compose.yml ec2-user@ec2-18-236-70-145.us-west-2.compute.amazonaws.com:/home/ec2-user/
	scp -i "vestly.pem" nginx.conf ec2-user@ec2-18-236-70-145.us-west-2.compute.amazonaws.com:/home/ec2-user/
	ssh -i "vestly.pem" ec2-user@ec2-18-236-70-145.us-west-2.compute.amazonaws.com 'echo "TAG=$(TAG)" > .env && sudo docker-compose pull && sudo docker-compose down && sudo docker-compose up -d'

login:
	ssh -i "vestly.pem" ec2-user@ec2-18-236-70-145.us-west-2.compute.amazonaws.com

