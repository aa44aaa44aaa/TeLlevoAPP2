import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class PassRessetPage implements OnInit {

  constructor(private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Enlace enviado',
      message: 'Revise su mail y recupere el acceso a su cuenta',
      buttons: ['OK'],
    });
    

    await alert.present();
  }

  ngOnInit() {
  }

}
