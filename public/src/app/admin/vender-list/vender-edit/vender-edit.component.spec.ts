import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderEditComponent } from './vender-edit.component';

describe('VenderEditComponent', () => {
  let component: VenderEditComponent;
  let fixture: ComponentFixture<VenderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
