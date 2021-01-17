import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLocationCreateAndUpdateComponent } from './service-location-create-and-update.component';

describe('ServiceLocationCreateAndUpdateComponent', () => {
  let component: ServiceLocationCreateAndUpdateComponent;
  let fixture: ComponentFixture<ServiceLocationCreateAndUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceLocationCreateAndUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceLocationCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
