import { Injector, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { OktaAuthModule,OktaCallbackComponent,OKTA_CONFIG, OktaAuthGuard } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { Router } from '@okta/okta-signin-widget/types/packages/@okta/courage-dist/types';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

// function sendToLoginPage(oktaAuth:OktaAuth,injector:Injector){
//   const router=injector.get(Router);
//   router.navigate('/login');
// }

// data: { onAuthRequired: sendToLoginPage }
const routes:Routes =[
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ] },
  {path: 'members', component: MembersPageComponent, canActivate: [ OktaAuthGuard ]},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: "home",           component: HomeComponent},
  {path: "checkout",           component: CheckoutComponent},
  {path:"cart-details",     component: CartDetailsComponent},
  {path:"products/:id",  component: ProductDetailsComponent},
  {path:"search/:keyword",  component: ProductListComponent},
  {path:"category/:id/:name",     component: ProductListComponent},
  {path:"category",         component: ProductListComponent},
  {path:"products",         component: ProductListComponent},
  {path:"",redirectTo:         "/home",pathMatch:'full'},
  {path:"**",redirectTo:       "/home",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),OktaAuthModule],
  exports: [RouterModule],
  providers:[{ provide: OKTA_CONFIG, useValue: { oktaAuth }}]
})


export class AppRoutingModule { }
