{{/*
Expand the name of the chart.
*/}}
{{- define "webservice.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "webservice.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "webservice.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "webservice.labels" -}}
helm.sh/chart: {{ include "webservice.chart" . }}
{{ include "webservice.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "webservice.selectorLabels" -}}
app.kubernetes.io/name: {{ include "webservice.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Hostname
*/}}
{{- define "webservice.hostname" -}}
{{ $hostname := .Values.ingress.hostname }}
{{ printf "%s" $hostname }}
{{- end }}

}}

{{/*
Create the name of the service account to use
*/}}
{{- define "webservice.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "webservice.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}


{{- define "webservice.image" -}}
{{ include "common.images.image" ( dict "imageRoot" .Values.image "global" .Values.global ) }}
{{- end -}}

{{- define "webservice.pullSecrets" -}}
{{- $pullSecrets := .Values.imagePullSecrets -}}
{{- if and .Values.global .Values.global.imagePullSecrets -}}
{{- $pullSecrets = .Values.global.imagePullSecrets -}}
{{- end -}}
{{- if $pullSecrets -}}
imagePullSecrets: 
{{ $pullSecrets | toYaml | indent 2 }}  
{{ end }}
{{- end -}}