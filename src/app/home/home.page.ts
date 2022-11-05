import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BDDService } from '../servicios/bdd.service';
import { Viajes } from '../servicios/viajes';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string;
  password: string;
  nomap: string;
  navigationExtras: NavigationExtras;
  private ListViajes : any;

  constructor(private router: Router, private conexion: BDDService, private activeroute: ActivatedRoute, private alertController: AlertController) {

    
    var data = {
      "usuario": "",
      "pass": "",
      "nomap": ""
    }
    this.navigationExtras = {
      state: { data: data }
    };
    //EL metodo activeroutes nos permite verificar el contenido del navigations extras en la actual navegacion
    //Y revisar el contenido enviado del navigationExtras
    //Tomamos la data del extras y la almacenamos en un json local para utilizarla en la pagina
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        data = this.router.getCurrentNavigation().extras.state.data;
        console.log(data);
        this.username = data.usuario;
        this.password = data.pass;
        this.cargar();
      }
    })

  }

  addViaje()
  {
    this.router.navigate(['/add'], this.navigationExtras);
  }

  cargar() {
    var data = {
      "usuario": "",
      "pass": ""
    }
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        data = this.router.getCurrentNavigation().extras.state.data;
        this.username = data.usuario;
        this.password = data.pass;
        this.ViajesCargar();
      }
    })
  }

  ViajesCargar(){
    this.conexion.obtenerViajes().then((data) => {
      console.log("viajescargarr=");
      console.log(data);
      this.ListViajes = data;
      }, (error) => {
        console.log(error);
    })
  }

  //NgonInit carga al iniciar
  ngonInit() {  
    this.cargar();
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  //Sync sigue un orden secuencial a nivel de proceso 
  //Async no sigue este orden y puede aplicarse en cualquier momento ( no sigue dicho orden)
  //await necesario para el async indica que debe esperar una respuesta
  async mostrar() {
    const alert = await this.alertController.create({
      header: "Informacion",
      message: "Nombre del usuario: " + this.username,
      buttons: ["Aceptar"]
    })
    await alert.present();
  }
  
  handleRefresh(event) {
    setTimeout(() => {
      this.ViajesCargar();
      event.target.complete();
    }, 2000);
  };

}
