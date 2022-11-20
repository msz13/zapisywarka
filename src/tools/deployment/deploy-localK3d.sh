#!/bin/bash

# get flag options
while getopts 'i:t:f:' OPTION; do
  case "$OPTION" in
    i)
      image=$OPTARG      
      ;;
    t)
      tag=$OPTARG      
      ;; 
    f)
      path=$OPTARG      
      ;;   
  esac
done
shift "$(($OPTIND -1))"

[ -z $image ] && echo flag -i image is required && exit 1
[ -z $tag ] && echo flag -t tag is required && exit 1
[ -z $path ] && echo flag -f path to deployments files is required && exit 1

repo=localhost:9009
repoAlias=k3d-zapisywarka.localhost:9009

#image=zapisywarka-api
#tag=latest
# tag image
sha=$(docker images --quiet $image:$tag)
[ -z $sha ] && echo image $image:$tag not found && exit 1

imageName=$image:$sha

docker tag $image:$tag $repo/$imageName
echo tagged image: $repo/$imageName

docker push $repo/$imageName

# update deployment specyfication files
cwd=$(pwd)/$path/base
echo working directory: $cwd
cd $cwd 

kustomize edit set image $image=$repoAlias/$imageName

# deploy app
kustomize build | kubectl apply -f -
echo deployed image $repo/$imageName with repo alias $repoAlias