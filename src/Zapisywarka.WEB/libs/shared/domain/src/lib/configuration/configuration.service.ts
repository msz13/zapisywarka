import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'


interface Config {

  identityServerUrl: string,
  clientId: string
  
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) {

  }

  private config!: Config

  loadConfig() {
    return this.http.get('./assets/config.json')
        .toPromise()
        .then((config: any) => {
            this.config = config;            
        })
        .catch((err: any) => {
            console.error(err);
        })

  }

  getConfig(): Config {
    return this.config
  }
}
 