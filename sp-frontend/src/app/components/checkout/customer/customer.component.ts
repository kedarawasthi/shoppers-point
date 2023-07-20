import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent {
  constructor(){}
  @Input() form!:FormGroup;
  ngOnInit():void{
    
    // this.firstName.setValue(this.form.get('customer.firstName').value);
    // this.lastName.setValue(this.form.controls['customer'].get('lastName').value);
    // this.email.setValue(this.form.controls['customer'].get('email').value);
    //this.email.setValue(this.form.controls['customer'].get('email').value);
    // console.log(this.form);
    // console.log(this.form.get('customer.firstName'));
    // console.log(this.form.controls['customer'].get('firstName'));
    // console.log(this.FName);
    // console.log(this.LName);
    // console.log(this.Email);  
  }

  get firstName() { return this.form.get('customer.firstName');}
  get lastName() { return this.form.get('customer.lastName');}
  get email() { return this.form.get('customer.email');}
  
  step1Submitted(){
    // if(this.form.invalid){
    //   this.form.markAllAsTouched();
      
    // }
    console.log(this.form);
  }

}
