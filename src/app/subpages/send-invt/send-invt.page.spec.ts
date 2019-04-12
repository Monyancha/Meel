import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInvtPage } from './send-invt.page';

describe('SendInvtPage', () => {
  let component: SendInvtPage;
  let fixture: ComponentFixture<SendInvtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendInvtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendInvtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
