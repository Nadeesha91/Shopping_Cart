import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopingItemComponent } from './shoping-item.component';

describe('ShopingItemComponent', () => {
  let component: ShopingItemComponent;
  let fixture: ComponentFixture<ShopingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
