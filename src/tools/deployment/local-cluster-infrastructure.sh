helm repo add stackgres-charts https://stackgres.io/downloads/stackgres-k8s/stackgres/helm/ \
&& \
helm install --create-namespace --namespace stackgres stackgres-operator --values ./stackgres-operator/values.yml stackgres-charts/stackgres-operator