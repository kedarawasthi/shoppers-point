import { Component,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Purchase } from 'src/app/common/purchase';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  purchase:Purchase;
  isReviewed:boolean=false;
  // form: FormGroup;
  description:string;

  constructor(
      private dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) data:any) {

      this.purchase = data.purchase;
  }

  // ngOnInit() {
  //     this.form = fb.group({
  //         description: [description, []],
  //         ...
  //     });
  // }

  save() {
      this.dialogRef.close(!this.isReviewed);
  }

  close() {
      this.dialogRef.close();
  }

}
