import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCreateAndUpdateComponent } from './service-create-and-update.component';

describe('ServiceCreateAndUpdateComponent', () => {
  let component: ServiceCreateAndUpdateComponent;
  let fixture: ComponentFixture<ServiceCreateAndUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCreateAndUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
