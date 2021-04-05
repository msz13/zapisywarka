import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteConfirmationComponent implements OnInit {

  @Input() message: string;

  constructor(private ref: NbDialogRef<DeleteConfirmationComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.ref.close(false)
  }

  confirm() {
    this.ref.close(true)
  }

}
