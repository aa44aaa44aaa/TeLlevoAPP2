import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BDDService } from '../../servicios/bdd.service';
import { Viajes } from '../../servicios/viajes';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  private ListViajes : any;
  handlerMessage = '';
  roleMessage = '';
  url = '';
  url2 = '';
  

  constructor(private activatedRoute: ActivatedRoute, private conexion: BDDService,
    private alerta: AlertController, private router: Router , private modalCtrl: ModalController,private alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      this.ListViajes = this.conexion.BuscarViaje(paramMap.get('id')).then((data) => {
        console.log("Viaje="+paramMap.get('id'));
        console.log(data);
        this.ListViajes = data;
        }, (error) => {
          console.log(error);
      })
    })
  }

  async  eliminar() {
    console.log("Eliminado")
    const aux = await this.alerta.create({
      header: 'Eliminar',
      message: 'Estas seguro de eliminar el dato?',
      buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
          text: 'Eliminar',
          handler: () => {
            this.conexion.borrarViaje(this.ListViajes.id)
            this.router.navigate(['/home'])
          }
        } 
      ]
    })

    await aux.present();

  }

  async modificar() {
    console.log("Modificar")
    const aux = await this.alerta.create({
      header: 'Modioficar',
      message: 'Estas seguro de modificar el dato?',
      buttons: [
      {
        text: 'Si',
        role: 'cancel'
      },
      {
          text: 'Modificar',
          handler: () => {
            this.url = this.ListViajes.id.toString()
            this.url2 = "/edit/"+this.url
            this.router.navigate([this.url2])
          }
        } 
      ]
    })

    await aux.present();

  }
  /*
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Desea continuar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Cancelada';
          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Confimada';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  */
  }

