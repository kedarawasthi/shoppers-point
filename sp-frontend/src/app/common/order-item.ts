import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl:string;
    quantity:number;
    unitPrice:number;
    productId:number;
    constructor(theCartItem:CartItem){
        this.imageUrl=theCartItem.imageUrl;
        this.productId=theCartItem.id;
        this.quantity=theCartItem.quantity;
        this.unitPrice=theCartItem.unitPrice;
    }
}
