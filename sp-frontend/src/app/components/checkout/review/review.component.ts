import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/common/address';
import { Country } from 'src/app/common/country';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  constructor( private cartService:CartService,private route:Router, 
                private checkoutService:CheckoutService,
                public dialog: MatDialog){}
  @Input() form:FormGroup;
  formSubmitted:boolean;
  totalPrice:number = 0;
  totalQuantity:number = 0;
  ngOnInit():void{
    this.reviewCartDetails();
  }
  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(data=>this.totalPrice=data);
    this.cartService.totalQuantity.subscribe(data=>this.totalQuantity=data);
  }

  onSubmit(){
    console.log(this.form);
    const cartItems=this.cartService.cartItems;
    let order:Order=new Order();
    order.totalPrice=this.totalPrice;
    order.totalQuantity=this.totalQuantity;

    let billingAddress:Address=this.form.controls['billingAddress'].value;
    let shippingAddress:Address=this.form.controls['shippingAddress'].value;

    let orderItems:OrderItem[]= cartItems.map(tempCartItem=>new OrderItem(tempCartItem));

    let customer:Customer=this.form.controls['customer'].value;

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

    console.log(purchase);

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
        "purchase":purchase
    };
    this.dialog.open(DialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );  
    
    
    // this.checkoutService.placeOrder(purchase).subscribe({
    //   next:response=>{
    //     alert( `Your Order Has been Received.\nOrder Tracking Number is ${response.orderTrackingNumber}`);
    //     this.resetCart();
    //   },
    //   error:err=>{
    //     alert(`There was an error: ${err.message}`);
    //   }
    // });
  }

  resetCart(){
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.form.reset();
    this.route.navigateByUrl("/products");
  }

}
