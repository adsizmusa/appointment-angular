import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCreateAndUpdateComponent } from './company-create-and-update.component';

describe('CompanyCreateAndUpdateComponent', () => {
  let component: CompanyCreateAndUpdateComponent;
  let fixture: ComponentFixture<CompanyCreateAndUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCreateAndUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
