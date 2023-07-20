import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { Address } from 'src/app/common/address';
import { Country } from 'src/app/common/country';
import { Customer } from 'src/app/common/customer';
import { Luv2ShopValidators } from 'src/app/common/luv2-shop-validators';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  isAuthenticated: boolean = false;

  checkoutFormGroup: FormGroup=undefined!;
  totalPrice:number = 0;
  totalQuantity:number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  selectedMonth:number;
  selectedYear:number;

  countries:Country[]=[];

  shippingAddressStates:State[]=[];
  billingAddressStates:State[]=[];

  constructor(private formBuilder:FormBuilder,
              private luv2ShopFormService:Luv2ShopFormService,
              private cartService:CartService,
              private checkoutService:CheckoutService,
              private route:Router,
              private oktaAuthService: OktaAuthStateService){}
  
  ngOnInit():void{

    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
      }
    );
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace]
        ),
        lastName: new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace]
        ),
        email:new FormControl('',
        [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),Luv2ShopValidators.notOnlyWhiteSpace]
        )
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('',
        [Validators.required]
        ),
        street: new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace]
        ),
        city:new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace]
        ),
        state:new FormControl('',
        [Validators.required]
        ),
        zipCode: new FormControl('',
        [Validators.required,Validators.pattern('[0-9]{6}')]
        )
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('',
        [Validators.required]
        ),
        street: new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace]
        ),
        city:new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace]
        ),
        state:new FormControl('',
        [Validators.required]
        ),
        zipCode: new FormControl('',
        [Validators.required,Validators.pattern('[0-9]{6}')]
        )
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',
        [Validators.required]
        ),
        nameOnCard: new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace]
        ),
        cardNumber: new FormControl('',
        [Validators.required,Validators.pattern('[0-9]{16}')]
        ),
        securityCode:new FormControl('',
        [Validators.required,Validators.pattern('[0-9]{3}')]
        ),
        expirationMonth: [''],
        expirationYear:['']
      })
    });

    const startMonth:number =new Date().getMonth()+1;
    const startYear:number= new Date().getFullYear();
    this.selectedMonth=startMonth;
    this.selectedYear=startYear;
    this.checkoutFormGroup.get('creditCard.expirationMonth').setValue(this.selectedMonth);
    this.checkoutFormGroup.get('creditCard.expirationYear').setValue(this.selectedYear);

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(data=>{
      this.creditCardMonths=data;
    });

    this.luv2ShopFormService.getCreditCardYears().subscribe(data=>{
      this.creditCardYears=data;
    });

    this.luv2ShopFormService.listCountries().subscribe(data=>{
      this.countries=data;
    });

 
    this.reviewCartDetails();
    

  }
  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(data=>this.totalPrice=data);
    this.cartService.totalQuantity.subscribe(data=>this.totalQuantity=data);
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName');}
  get lastName() { return this.checkoutFormGroup.get('customer.lastName');}
  get email() { return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressCountry(){ return this.checkoutFormGroup.get('shippingAddress.country');}
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode');}
  
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country');}
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode');}
  
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode');}

  onSubmit(){
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
    else{
      const cartItems=this.cartService.cartItems;
      let order:Order=new Order();
      order.totalPrice=this.totalPrice;
      order.totalQuantity=this.totalQuantity;
  
      let billingAddress:Address=this.checkoutFormGroup.controls['billingAddress'].value;
      let shippingAddress:Address=this.checkoutFormGroup.controls['shippingAddress'].value;
  
      let orderItems:OrderItem[]= cartItems.map(tempCartItem=>new OrderItem(tempCartItem));
  
      let customer:Customer=this.checkoutFormGroup.controls['customer'].value;
  
      let purchase:Purchase=new Purchase();
  
      purchase.billingAddress=billingAddress;
      const billingState:State=JSON.parse(JSON.stringify(purchase.billingAddress.state));
      const billingCountry:Country=JSON.parse(JSON.stringify(purchase.billingAddress.country));
      purchase.billingAddress.state=billingState.name;
      purchase.billingAddress.country=billingCountry.name;
  
      purchase.shippingAddress=shippingAddress;
      const shippingState:State=JSON.parse(JSON.stringify(purchase.shippingAddress.state));
      const shippingCountry:Country=JSON.parse(JSON.stringify(purchase.shippingAddress.country));
      purchase.shippingAddress.state=shippingState.name;
      purchase.shippingAddress.country=shippingCountry.name;
      
      purchase.customer=customer;
      purchase.order=order;
      purchase.orderItems=orderItems;
  
      // console.log(purchase);
      this.checkoutService.placeOrder(purchase).subscribe({
        next:response=>{
          alert( `Your Order Has been Received.\nOrder Tracking Number is ${response.orderTrackingNumber}`);
          this.resetCart();
        },
        error:err=>{
          alert(`There was an error: ${err.message}`);
        }
      });
    }
   
  }

  resetCart(){
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.cartService.storage.clear();
    this.route.navigateByUrl("/products");
  }

  copyShippingAddressToBillingAddress(check:boolean) {
    if(check)
    {
      this.checkoutFormGroup.controls['billingAddress'].
        setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
        this.billingAddressStates=this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates=[];
    } 

  }

  handleMonthsAndYears(){
    const creditCardFormGorup = this.checkoutFormGroup.get('creditCard');

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

  listCountryStates(formGroupName:string){

    const formGroup=this.checkoutFormGroup.get(formGroupName);
    const countryCode=formGroup?.value.country.code;

    this.luv2ShopFormService.listStatesByCountryCode(countryCode).subscribe(data=>{
      if(formGroupName == 'shippingAddress'){
        this.shippingAddressStates=data;
      }
      else
      {
        this.billingAddressStates=data;
      }
    });
  }

}
