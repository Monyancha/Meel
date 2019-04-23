import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtPagePage } from './ivt-page.page';

describe('IvtPagePage', () => {
  let component: IvtPagePage;
  let fixture: ComponentFixture<IvtPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
