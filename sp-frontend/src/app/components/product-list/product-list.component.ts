import { Component } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {


  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string="";
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = this.products?.length !=0;

  pageEvent: PageEvent;
  
  previousKeyword: string = "";

  constructor(private productService: ProductService,
              private cartService: CartService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }


  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword than previous
    // then set thePageNumber to 1

    if (this.previousKeyword != theKeyword) {
      this.pageIndex = 0;
    }

    this.previousKeyword = theKeyword;

    //console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.pageIndex,
                                               this.pageSize,
                                               theKeyword).subscribe(this.processResult());
                                               
  }

  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageIndex = 0;
    }

    this.previousCategoryId = this.currentCategoryId;

    //console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.pageIndex,
                                               this.pageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());
  }

  updatePageSize(event:PageEvent) {
    // console.log(event);
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    
    // console.log(this.products);
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageIndex = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    this.listProducts();
    // console.log(this.products);
   
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageIndex = data.page.number;
      this.pageSize = data.page.size;
      this.length = data.page.totalElements;
    };
  }


  addToCart(theProduct: Product) {
    // console.log(`Adding to Cart ${theProduct.name} , ${theProduct.unitPrice}`);  
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}
