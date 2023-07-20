import { Component ,EventEmitter,Input, Output} from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';


@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent {
  constructor(private luv2ShopFormService:Luv2ShopFormService){}
  @Input() form:FormGroup;
  @Output() formEvent = new EventEmitter<FormGroup>();
  @Output() statesEvent= new EventEmitter<State[]>();
  @Output() countriesEvent= new EventEmitter<Country[]>();
  countries:Country[]=[];
  shippingAddressStates:State[]=[];


  ngOnInit():void{
    
    this.luv2ShopFormService.listCountries().subscribe(data=>{
      this.countries=data;
      this.countriesEvent.emit(data);
    });
  }
  get shippingAddressCountry(){ return this.form.get('shippingAddress.country');}
  get shippingAddressState() { return this.form.get('shippingAddress.state');}
  get shippingAddressCity() { return this.form.get('shippingAddress.city');}
  get shippingAddressStreet() { return this.form.get('shippingAddress.street');}
  get shippingAddressZipCode() { return this.form.get('shippingAddress.zipCode');}
  step2Submitted(){
    
    this.formEvent.emit(this.form);
    // if(this.form.invalid){
    //   this.form.markAllAsTouched();
    // }
    console.log(this.form);
  }

  listCountryStates(formGroupName:string){

    const formGroup=this.form.get(formGroupName);
    const countryCode=formGroup?.value.country.code;
    // console.log(formGroup);
    // console.log(countryCode);
    this.luv2ShopFormService.listStatesByCountryCode(countryCode).subscribe(data=>{
      this.shippingAddressStates=data;
      this.statesEvent.emit(data);
    });
    
  }
}
