import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {

  cartItems:CartItem[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;
  constructor(private cartService:CartService,private route:Router){}
  ngOnInit():void{
    //console.log('printed ngOn in it');
    this.listCartDetails();
  }

  listCartDetails(){
    this.cartItems=this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(data=>{
      //console.log(`totalPrice: ${data}`);
      this.totalPrice=data;
    });
    this.cartService.totalQuantity.subscribe(data=>{
      //console.log(`totalQuantity: ${data}`);
      this.totalQuantity=data;
    });
    
    // when "Add to cart" is clicked from product list page, 
    // items gets added to cart and "computeCartTotal" is invoked. When we click on "Cart Icon", 
    // CartDetailsComponent gets initialized, but "totalPrice" and "quantity" would have already been published 
    // before "CardDetailsComponet" had got initialized. So "computeCartTotal" has to be called again.
     this.cartService.computeCartTotals();

  }
  incrementQuantity(theCartItem:CartItem){
    this.cartService.addToCart(theCartItem);
  }
  decrementQuantity(theCartItem:CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }
  remove(theCartItem:CartItem){
  this.cartService.removeCartItem(theCartItem);    
  }

}
