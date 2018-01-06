import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueNewComponent } from './venue-new.component';

describe('VenueNewComponent', () => {
  let component: VenueNewComponent;
  let fixture: ComponentFixture<VenueNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
