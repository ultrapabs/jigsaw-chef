import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { RfcfesPage } from './rfcfes.page';

describe('RfcfesPage', () => {
  let component: RfcfesPage;
  let fixture: ComponentFixture<RfcfesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfcfesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RfcfesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
