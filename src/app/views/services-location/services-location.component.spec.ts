import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesLocationComponent } from './services-location.component';

describe('ServicesLocationComponent', () => {
  let component: ServicesLocationComponent;
  let fixture: ComponentFixture<ServicesLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
