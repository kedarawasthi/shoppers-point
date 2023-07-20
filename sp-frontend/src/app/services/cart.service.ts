import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  storage:Storage=sessionStorage;
  cartItems: CartItem[] = [];
  totalPrice: Subject<number>= new BehaviorSubject<number>(0);
  totalQuantity: Subject<number>= new BehaviorSubject<number>(0);
  constructor() { 
    let data=JSON.parse(this.storage.getItem("cartItems"));
    if(data!=null){
      this.cartItems=data;
      this.computeCartTotals();
    }
  }

  addToCart(theCartItem:CartItem){
    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem =undefined! ;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id )!;

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();

  }
  computeCartTotals() {
    let totalPriceValue:number= 0 ;
    let totalQuantityValue:number = 0;

    for(let currentCartItem of this.cartItems)
    {
      totalPriceValue += (currentCartItem.unitPrice! * currentCartItem.quantity);
      totalQuantityValue += (currentCartItem.quantity);
    }

    
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.persistCartItems();
  }
  decrementQuantity(theCartItem:CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity==0){
      this.removeCartItem(theCartItem);
    }
    else{
      this.computeCartTotals();
    }
  }
  removeCartItem(theCartItem:CartItem){
    const itemIndex= this.cartItems.findIndex(tempCartItem=> theCartItem.id === tempCartItem.id);
    if(itemIndex>-1) {
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }

  persistCartItems(){
    this.storage.setItem("cartItems",JSON.stringify(this.cartItems));
  }

}
