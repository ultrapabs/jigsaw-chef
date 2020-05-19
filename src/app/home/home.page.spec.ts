import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RedirectService } from '../_service/redirect.service';
import { Platform } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let platformSpy, redirectSpy;

  beforeEach(async(() => {
    platformSpy = jasmine.createSpyObj('Platform', ['is']);
    redirectSpy = jasmine.createSpyObj('RedirectService', ['checkUrlAndRedirect']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: RedirectService, useValue: redirectSpy }
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checks for query parameters to redirect and sets if mobile on init', () => {
    component.ngOnInit();

    expect(platformSpy.is).toHaveBeenCalledWith('mobile');
    expect(redirectSpy.checkUrlAndRedirect).toHaveBeenCalled();
  });
});
