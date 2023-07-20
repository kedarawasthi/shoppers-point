import { Component,Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent {
  constructor(private luv2ShopFormService:Luv2ShopFormService){}
  @Input() form:FormGroup;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  selectedMonth:number;
  selectedYear:number;

  ngOnInit():void{

    const startMonth:number =new Date().getMonth()+1;
    const startYear:number= new Date().getFullYear();
    this.selectedMonth=startMonth;
    this.selectedYear=startYear;
    
    // console.log(this.form.get('creditCard.expirationMonth'));
    // console.log(this.form.get('creditCard.expirationYear'));
    this.form.get('creditCard.expirationMonth').setValue(this.selectedMonth);
    this.form.get('creditCard.expirationYear').setValue(this.selectedYear);
    // console.log(this.form.get('creditCard.expirationMonth'));
    // console.log(this.form.get('creditCard.expirationYear'));
    
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(data=>{
      this.creditCardMonths=data;
    });

    this.luv2ShopFormService.getCreditCardYears().subscribe(data=>{
      this.creditCardYears=data;
    });

  }
  get creditCardNameOnCard() { return this.form.get('creditCard.nameOnCard');}
  get creditCardType() { return this.form.get('creditCard.cardType');}
  get creditCardNumber() { return this.form.get('creditCard.cardNumber');}
  get creditCardSecurityCode() { return this.form.get('creditCard.securityCode');}

  step4Submitted(){
    // if(this.form.invalid){
    //   this.form.markAllAsTouched();
    // }
    console.log(this.form);
  }
  handleMonthsAndYears(){
    const creditCardFormGorup = this.form.get('creditCard');

    const currentYear:number =new Date().getFullYear();
    const selectedYear:number= Number(creditCardFormGorup?.value.expirationYear);

    let startMonth:number;

    if(currentYear==selectedYear)
    {
      startMonth=new Date().getMonth()+1;
    }
    else
    {
      startMonth=1;
    }
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(data=>{
      this.creditCardMonths=data;
    });
  }
}
