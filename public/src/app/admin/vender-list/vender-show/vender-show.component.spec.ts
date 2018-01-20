import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderShowComponent } from './vender-show.component';

describe('VenderShowComponent', () => {
  let component: VenderShowComponent;
  let fixture: ComponentFixture<VenderShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
