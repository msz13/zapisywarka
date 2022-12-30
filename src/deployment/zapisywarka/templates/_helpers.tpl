{{- define "imagePullSecret" }}
{{- printf "{\"auths\": {\"%s\": {\"auth\": \"%s\"}}}" .registry (printf "%s:%s" .userName .token | b64enc) | b64enc }}
{{- end }}