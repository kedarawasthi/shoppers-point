import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategorySidenavComponent } from './product-category-sidenav.component';

describe('ProductCategorySidenavComponent', () => {
  let component: ProductCategorySidenavComponent;
  let fixture: ComponentFixture<ProductCategorySidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategorySidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategorySidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
