import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css']
})
export class BillingAddressComponent {
  constructor(private luv2ShopFormService:Luv2ShopFormService){}
  @Input() form!:FormGroup;
  @Input() countries:Country[]=[];
  @Input() tempForm!:FormGroup;
  @Input() shippingAddressStates:State[]=[]

  billingAddressStates:State[]=[];

  

  ngOnInit():void{
  
    this.form.controls['billingAddress'].reset();
    this.billingAddressStates=[];

  }

  get billingAddressCountry() { return this.form.get('billingAddress.country');}
  get billingAddressState() { return this.form.get('billingAddress.state');}
  get billingAddressCity() { return this.form.get('billingAddress.city');}
  get billingAddressStreet() { return this.form.get('billingAddress.street');}
  get billingAddressZipCode() { return this.form.get('billingAddress.zipCode');}

  step3Submitted(){
    // if(this.form.invalid){
    //   this.form.markAllAsTouched();
    // }
    console.log(this.form);
  }

  copyShippingAddressToBillingAddress(check:boolean) {
    if(check)
    {
      // console.log(this.tempForm.controls['shippingAddress'].value);
      // console.log(this.tempForm.controls['billingAddress'].value);
      // console.log(this.billingAddressStates);
      // console.log(this.shippingAddressStates);
      this.form.controls['billingAddress'].
        setValue(this.tempForm.controls['shippingAddress'].value);
      this.billingAddressStates=this.shippingAddressStates;
      // console.log(this.tempForm.controls['shippingAddress'].value);
      // console.log(this.tempForm.controls['billingAddress'].value);
      // console.log(this.billingAddressStates);
      // console.log(this.shippingAddressStates);
        // this.form.controls['billingAddress'].disable;
    }
    else{
      this.form.controls['billingAddress'].reset();
      this.billingAddressStates=[];
    } 
  }

  listCountryStates(formGroupName:string){

    const formGroup=this.form.get(formGroupName);
    const countryCode=formGroup?.value.country.code;

    this.luv2ShopFormService.listStatesByCountryCode(countryCode).subscribe(data=>{
      this.billingAddressStates=data;
    });
  }
}
