import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmstemplateCreateAndUpdateComponent } from './smstemplate-create-and-update.component';

describe('SmstemplateCreateAndUpdateComponent', () => {
  let component: SmstemplateCreateAndUpdateComponent;
  let fixture: ComponentFixture<SmstemplateCreateAndUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmstemplateCreateAndUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmstemplateCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
