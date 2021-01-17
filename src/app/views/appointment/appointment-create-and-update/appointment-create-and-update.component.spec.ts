import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCreateAndUpdateComponent } from './appointment-create-and-update.component';

describe('AppointmentCreateAndUpdateComponent', () => {
  let component: AppointmentCreateAndUpdateComponent;
  let fixture: ComponentFixture<AppointmentCreateAndUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentCreateAndUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
