import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService, User } from '@zapisywarka-client-aps/web-identity-domain';

@Component({
  template: `
    <app-sign-up
      (userSubmited)="onSubmit($event)"
      [loading]="loading"
      [error]="error"
    >
    </app-sign-up>
  `,
  styleUrls: ['./sign-up.container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-sing-iup-coint',
})
export class SignUpContainerComponent {
  loading = false;
  error: Error | null = null;

  constructor(private userService: UserService) {}

  onSubmit(event: User) {
    this.loading = true;
    this.userService.createUser(event).subscribe({
      next: (result) => {
        if (result) {
          this.redirectToApp();
        }
      },
      error: (err: Error) => (this.error = err),
    });
  }

  redirectToApp() {
    window.location.href = '/login';
  }
}
