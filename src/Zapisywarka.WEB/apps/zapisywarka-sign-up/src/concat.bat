ECHO OFF
CD ..\..\..\dist\apps\zapisywarka-sign-up
TYPE  runtime.js polyfills.js main.js > sign-up-element.js
COPY sign-up-element.js ..\..\..\..\zapisywarka.api\modules\identity\Zapisywarka.API.Modules.Identity\wwwroot\js
PAUSE