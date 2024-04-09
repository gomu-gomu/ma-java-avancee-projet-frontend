#!/bin/sh

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <dev|prod>"
  exit 1
fi

mode=$1
tag="0.0.1"
username="gomu-gomu"
project="ma-java-avancee-projet-frontend"
image="$username/$project:$tag-$mode"

if [ "$mode" = "dev" ]; then
  dockerfile="./docker/Dockerfile.dev"
elif [ "$mode" = "prod" ]; then
  dockerfile="./docker/Dockerfile"
else
  echo "Invalid mode: $mode"
  echo "Please choose 'dev' or 'prod'."
  exit 2
fi

docker build -f $dockerfile -t $image .

if [ "$mode" = "dev" ]; then
  docker run -it --rm --network=docker_default -v "$(pwd)":/app -p 3000:3000 $image
elif [ "$mode" = "prod" ]; then
  docker run -it --rm -p 3000:3000 $image
fi