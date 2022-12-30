#!/bin/bash

image=zapywarka-rejestracja
dockerfile=apps/zapisywarka-rejestracja/Dockerfile

nerdctl --namespace k8s.io build -t $image:latest   -f $dockerfile .

sha=$(nerdctl images --namespace k8s.io --quiet $image:latest)
[ -z $sha ] && echo image $image:latest not found && exit 1

imageName=$image:$sha

nerdctl --namespace k8s.io tag $image:latest $imageName
echo tagged image: $imageName

helm upgrade zapisywarka --install --set  rejestracja.image.tag=$sha ./deployment/zapisywarka


# update deployment specyfication files
#cwd=$(pwd)/$path
#echo working directory: $cwd
#cd $cwd 

#kustomize edit set image $image:$sha

# deploy app
#kustomize build | kubectl apply -f -
#echo deployed image $imageName 