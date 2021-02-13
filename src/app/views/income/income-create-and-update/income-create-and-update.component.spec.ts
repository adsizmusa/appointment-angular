import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeCreateAndUpdateComponent } from './income-create-and-update.component';

describe('IncomeCreateAndUpdateComponent', () => {
  let component: IncomeCreateAndUpdateComponent;
  let fixture: ComponentFixture<IncomeCreateAndUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeCreateAndUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
