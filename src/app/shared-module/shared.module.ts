import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCategoryMenuComponent } from '../components/product-category-menu/product-category-menu.component';
import { FooterComponent } from 'src/app/components/footer-section/footer-section.component';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { CallToActionComponent } from '../components/call-to-action/call-to-action.component';
import { MainHeroComponent } from '../components/main-hero/main-hero.component';
import { ShoppingGridComponent } from '../components/shopping-grid/shopping-grid.component';
import { AboutSectionComponent } from '../components/about-section/about-section.component';
import { CategoriesSectionComponent } from '../components/categories-section/categories-section.component';
import { FeaturedProductComponent } from '../components/featured-product/featured-product.component';
import { CheckoutSectionComponent } from '../components/checkout-section/checkout-section.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { SearchBoxComponent } from '../components/search-box/search-box.component';
import { LoginStatusComponent } from '../components/login-status/login-status.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import tobiAppConfig from '../config/tobi-app-config';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { ProductService } from '../services/product.service';

const oktaConfig = Object.assign(
  {
    onAuthRequired: (injector: any) => {
      const router = injector.get(Router);
      // Redirect the user to the custom login page
      router.navigate(['/login']);
    },
  },
  tobiAppConfig
);

@NgModule({
  declarations: [
    FooterComponent,
    SearchBoxComponent,
    NavigationBarComponent,
    CallToActionComponent,
    MainHeroComponent,
    AboutSectionComponent,
    CategoriesSectionComponent,
    FeaturedProductComponent,
    CheckoutSectionComponent,
    ProductDetailComponent,
    ShoppingGridComponent,
    LoginStatusComponent,
    ProductCategoryMenuComponent,
  ],
  exports: [
    FooterComponent,
    SearchBoxComponent,
    NavigationBarComponent,
    CallToActionComponent,
    MainHeroComponent,
    AboutSectionComponent,
    CategoriesSectionComponent,
    FeaturedProductComponent,
    CheckoutSectionComponent,
    ProductDetailComponent,
    ShoppingGridComponent,
    LoginStatusComponent,
    ProductCategoryMenuComponent,
    ReactiveFormsModule,
    NgbModule,
  ],
  imports: [CommonModule, RouterModule, NgbModule, ReactiveFormsModule],
  providers: [ProductService],
})
export class SharedModule {}
