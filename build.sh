#!/bin/bash

build() {
  cd ui
	docker build -t bingematch-ui . 
	docker tag bingematch-ui:latest 990223444407.dkr.ecr.us-west-2.amazonaws.com/bingematch-ui:latest
	docker push 990223444407.dkr.ecr.us-west-2.amazonaws.com/bingematch-ui:latest

  cd ../api
	docker build -t bingematch-api .
	docker tag bingematch-api:latest 990223444407.dkr.ecr.us-west-2.amazonaws.com/bingematch-api:latest
	docker push 990223444407.dkr.ecr.us-west-2.amazonaws.com/bingematch-api:latest

  cd ..
	kubectl apply -f deploy/
}

$1 $2 $3 $4 $5 
