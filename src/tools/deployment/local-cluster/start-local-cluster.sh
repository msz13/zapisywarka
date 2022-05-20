k3d registry create zapisywarka.localhost --port 9009 \
&& \
k3d cluster create --config $HOME/programowanie/zapisywarka/src/tools/deployment/local-cluster/k3d-config.yml 
