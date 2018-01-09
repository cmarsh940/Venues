import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmmenityListComponent } from './ammenity-list.component';

describe('AmmenityListComponent', () => {
  let component: AmmenityListComponent;
  let fixture: ComponentFixture<AmmenityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmmenityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmmenityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
