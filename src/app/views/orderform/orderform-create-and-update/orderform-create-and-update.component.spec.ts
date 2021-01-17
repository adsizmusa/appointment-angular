import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderformCreateAndUpdateComponent } from './orderform-create-and-update.component';

describe('OrderformCreateAndUpdateComponent', () => {
  let component: OrderformCreateAndUpdateComponent;
  let fixture: ComponentFixture<OrderformCreateAndUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderformCreateAndUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderformCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
