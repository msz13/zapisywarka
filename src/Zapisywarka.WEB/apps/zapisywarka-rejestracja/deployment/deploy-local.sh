#!/bin/bash
image=zapisywarka-rejestracja
tag=latest
sha=$(docker images --quiet $image:$tag)
newImage=$image:$sha
docker tag $sha $newImage
kustomize edit set image $newImage
kustomize build | kubectl apply -f -
echo deployed image $newImage