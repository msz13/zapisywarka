{{- define "postgres.database.name" -}}
{{ .Values.database.name }}
{{- end -}}

{{- define "postgres.cluster.name" -}}
{{ .Values.clusterName }}
{{- end -}}