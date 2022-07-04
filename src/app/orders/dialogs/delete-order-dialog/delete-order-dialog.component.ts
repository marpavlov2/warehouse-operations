import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-order-dialog',
  templateUrl: './delete-order-dialog.component.html',
  styleUrls: ['./delete-order-dialog.component.scss'],
})
export class DeleteOrderDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public orderId: string
  ) {}

  ngOnInit() {}

  deleteOrder() {
    this.dialogRef.close(true);
  }
}
