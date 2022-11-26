#!/bin/bash

# get flag options
while getopts 'i:d:f:' OPTION; do
  case "$OPTION" in
    i)
      image=$OPTARG      
      ;;
    d) 
      dockerfile=$OPTARG
      ;;   
    f)
      path=$OPTARG      
      ;;   
  esac
done
shift "$(($OPTIND -1))"

[ -z $image ] && echo flag -i image is required && exit 1
[ -z $dockerfile ] && echo flag -d path to dockerfile is required && exit 1
[ -z $path ] && echo flag -f path to deployments files is required && exit 1

nerdctl --namespace k8s.io build -t $image:latest -f $dockerfile .

sha=$(nerdctl images --namespace k8s.io --quiet $image:latest)
[ -z $sha ] && echo image $image:latest not found && exit 1

imageName=$image:$sha

nerdctl --namespace k8s.io tag $image:latest $imageName
echo tagged image: $imageName


# update deployment specyfication files
cwd=$(pwd)/$path
echo working directory: $cwd
cd $cwd 

kustomize edit set image $image:$sha

# deploy app
kustomize build | kubectl apply -f -
echo deployed image $imageName 