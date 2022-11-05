import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BDDService } from '../servicios/bdd.service';
import { Usuarios } from '../servicios/usuarios';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private formData: FormGroup
  username: string = "";
  password: string = "";
  nomap: string = "";
  navigationExtras: NavigationExtras;
  constructor(private router: Router, private conexion: BDDService, private toastController: ToastController) { }

  ngOnInit() {
  }
  //Generamos una variable data con la informacion almacenada como JSON
  login() {
    

    var data = {
      "usuario": this.username,
      "pass": this.password,
      "nomap": this.nomap
    }
    this.navigationExtras = {
      state: { data: data }
    };
    this.conexion.obtenerViajes().then(gdata =>{
      console.log(gdata);
    }).catch(err => {
      this.presentToast("Datos Incorrectos","alert-toast","warning-outline");
      console.log("this is error = ", err)

    })
    this.conexion.BuscarUsuario(data.usuario).then(gdata =>{
      console.log("Nombre Usuario: "+gdata.user);
      console.log("Contraseña del Usuario: "+gdata.pass);
      console.log("Correo Usuario: "+gdata.correo);
      console.log("Nombre: "+gdata.nomap);
    
    if (data.usuario == gdata.user && data.pass == gdata.pass){
      console.log(data.usuario+" = "+gdata.user+" and "+data.pass+" = "+gdata.pass)
      this.presentToast("Ingreso Correcto","alertok-toast","lock-open-outline");
      this.router.navigate(['/home'], this.navigationExtras);
    }else{
      this.presentToast("Contraseña Incorrecta","alert-toast","warning-outline");
    }
    }).catch(err => {
      this.presentToast("Datos Incorrectos","alert-toast","warning-outline");
      console.log("this is error = ", err)

    })

    //Con la utilidad route y su navigation podemos navegar de una pagina a otra 
    //y adicionalmente con navigationsExtras podemos hacer envio de la informacion que necesitemos pasar de una pagina a otra
    
  }
 
    async presentToast(mensaje,style,icono) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      cssClass: style,
      icon: icono
    });

    await toast.present();
  }


}

