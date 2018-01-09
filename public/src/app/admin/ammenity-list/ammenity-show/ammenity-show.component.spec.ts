import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmmenityShowComponent } from './ammenity-show.component';

describe('AmmenityShowComponent', () => {
  let component: AmmenityShowComponent;
  let fixture: ComponentFixture<AmmenityShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmmenityShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmmenityShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
