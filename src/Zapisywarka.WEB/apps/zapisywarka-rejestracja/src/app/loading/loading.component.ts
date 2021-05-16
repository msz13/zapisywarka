import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@zapisywarka-client-aps/authentication/domain';

@Component({
  selector: 'zapisywarka-client-aps-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.login().then(()=>{
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/start']);
      }
    });
    
  }

}
