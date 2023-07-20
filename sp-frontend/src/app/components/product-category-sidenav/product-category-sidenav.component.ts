import { Component } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-sidenav',
  templateUrl: './product-category-sidenav.component.html',
  styleUrls: ['./product-category-sidenav.component.css']
})
export class ProductCategorySidenavComponent {
  productCategories:ProductCategory[]=[];
  constructor(private productService:ProductService){

  }

  ngOnInit(){
    this.listProductCategories();
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        //console.log("Product Categories: "+JSON.stringify(data));
        this.productCategories = data;
    });
  }


}
