import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastController } from '@ionic/angular';

describe('ToastService', () => {
  let toastController: MockToastController;
  let toastService: ToastService;

  beforeEach(() => {
    toastController = new MockToastController();

    TestBed.configureTestingModule({
      providers: [
        { provide: ToastController, useValue: toastController },
        ToastService
      ]
    });

    toastService = TestBed.get(ToastService);
  });

  it('should be created', () => {
    const service: ToastService = TestBed.get(ToastService);
    expect(service).toBeTruthy();
  });

  it('creates an info toast', () => {
    let testMessage = 'some message';
    spyOn(toastService, 'alertToast');

    toastService.infoToast(testMessage);
    expect(toastService.alertToast).toHaveBeenCalledWith(testMessage, 'tertiary');
  });

  it('creates a danger toast', () => {
    let testMessage = 'some message';
    spyOn(toastService, 'alertToast');

    toastService.dangerToast(testMessage);
    expect(toastService.alertToast).toHaveBeenCalledWith(testMessage, 'danger');
  });
});

export class MockToastService {

  constructor() { }

  infoToast(message: string) {
    message = null;
  }

  dangerToast(message: string) {
    message = null;
  }

}

class MockToastController {

  constructor() { }

  create () {

  }
}
