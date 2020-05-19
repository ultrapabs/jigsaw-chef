import { Component, OnInit } from '@angular/core';
import { RedirectService } from '../_service/redirect.service';
import { Platform } from '@ionic/angular';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  helpEmail: string = environment['helpEmail'];
  isMobile: boolean;

  constructor(
    private platform: Platform,
    private redirectService: RedirectService
  ) {}

  ngOnInit() {
    this.redirectService.checkUrlAndRedirect();
    this.isMobile = this.platform.is('mobile');
  }

}
