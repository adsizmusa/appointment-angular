import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCreateAndUpdateComponent } from './expense-create-and-update.component';

describe('ExpenseCreateAndUpdateComponent', () => {
  let component: ExpenseCreateAndUpdateComponent;
  let fixture: ComponentFixture<ExpenseCreateAndUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseCreateAndUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
