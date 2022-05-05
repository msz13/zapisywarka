import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-access-code',
  templateUrl: './access-code.component.html',
  styleUrls: ['./access-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessCodeComponent implements OnInit {

  accessCodeControl = new FormControl('', Validators.required);
  
  validateAccessCode() {
    this.accessCodeControl.markAsTouched();

    if (this.accessCodeControl.valid) {
     
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
