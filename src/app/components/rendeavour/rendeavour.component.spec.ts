import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendeavourPage } from './rendeavour.page';

describe('RendeavourPage', () => {
  let component: RendeavourPage;
  let fixture: ComponentFixture<RendeavourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendeavourPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendeavourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
