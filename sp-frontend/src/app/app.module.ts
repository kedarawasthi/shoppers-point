import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatCommonModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRippleModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductCategorySidenavComponent } from './components/product-category-sidenav/product-category-sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { LoginComponent } from './components/login/login.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './services/cart.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { Luv2ShopFormService } from './services/luv2-shop-form.service';
import { CheckoutService } from './services/checkout.service';
import { CustomerComponent } from './components/checkout/customer/customer.component';
import { ShippingAddressComponent } from './components/checkout/shipping-address/shipping-address.component';
import { BillingAddressComponent } from './components/checkout/billing-address/billing-address.component';
import { CreditCardComponent } from './components/checkout/credit-card/credit-card.component';
import { ReviewComponent } from './components/checkout/review/review.component';
import { DialogComponent } from './components/checkout/review/dialog/dialog.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    ProductDetailsComponent,
    ProductCategorySidenavComponent,
    FooterComponent,
    SearchComponent,
    LoginStatusComponent,
    LoginComponent,
    CartDetailsComponent,
    CartStatusComponent,
    CheckoutComponent,
    CustomerComponent,
    ShippingAddressComponent,
    BillingAddressComponent,
    CreditCardComponent,
    ReviewComponent,
    DialogComponent,
    MembersPageComponent,
    OrderHistoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,MatSidenavModule,MatCardModule,MatBadgeModule,MatAutocompleteModule,
    MatButtonModule,MatCheckboxModule,MatChipsModule,MatCommonModule,MatDatepickerModule,MatDialogModule,MatExpansionModule,
    MatFormFieldModule,MatDividerModule,MatGridListModule,MatIconModule,MatInputModule,MatListModule,MatMenuModule,MatPaginatorModule,
    MatProgressBarModule,MatRippleModule,MatRadioModule,MatProgressSpinnerModule,MatSlideToggleModule,MatSelectModule,MatSliderModule,
    MatSnackBarModule,MatSortModule,MatStepperModule,MatTableModule,MatTabsModule,MatTooltipModule,MatTreeModule
  ],
  providers: [ProductService,CartService,Luv2ShopFormService,CheckoutService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [DialogComponent]
})
export class AppModule { }
