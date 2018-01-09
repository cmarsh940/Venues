import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmmenityNewComponent } from './ammenity-new.component';

describe('AmmenityNewComponent', () => {
  let component: AmmenityNewComponent;
  let fixture: ComponentFixture<AmmenityNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmmenityNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmmenityNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
