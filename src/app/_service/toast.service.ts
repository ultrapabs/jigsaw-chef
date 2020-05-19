import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  infoToast(message: string) {
    this.alertToast(message, 'tertiary');
  }

  dangerToast(message: string) {
    this.alertToast(message, 'danger',);
  }

  async alertToast(message: string, alertType: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      color: alertType,
      buttons: [
        {
          side: 'start',
          icon:  'warning-outline'
        },
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    toast.present();
  }
}
