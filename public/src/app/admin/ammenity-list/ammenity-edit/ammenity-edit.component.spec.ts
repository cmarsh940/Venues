import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmmenityEditComponent } from './ammenity-edit.component';

describe('AmmenityEditComponent', () => {
  let component: AmmenityEditComponent;
  let fixture: ComponentFixture<AmmenityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmmenityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmmenityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
