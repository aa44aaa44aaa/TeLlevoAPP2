import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { BDDService } from '../servicios/bdd.service';
import { Usuarios } from '../servicios/usuarios';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //Se genera variable de tipo formgroup como formulario
  private formData: FormGroup
  //Generaremos una variable users para almacenar de manera persistente el valor de los usuarios entregados por la BDD
  private users: Usuarios[] = [];
  constructor(private router: Router, private alertController: AlertController, private conexion: BDDService) {


  }

  //Se inicializa en funcion ngOnInit como nuevo formgroup con estructura json declarando cada variable como un formcontrol
  ngOnInit() {
    this.formData = new FormGroup({
      usuario: new FormControl(),
      password: new FormControl(),
      correo: new FormControl(),
      nomap: new FormControl()
    })

  }
  //Metodo para imprimir todos los datos 
  //Junton con la estructura de como traer un array con todos los datos de la BDD
  mostrarDatos() {
    this.conexion.obtenerUsuarios().then(data => {
      this.users = data;
      this.users.forEach(tmp => {
        console.log("Nombre Usuario: "+tmp.user);
        console.log("Contraseña del Usuario: "+tmp.pass);
        console.log("Correo Usuario: "+tmp.correo);
        console.log("Nombre: "+tmp.nomap);
      });
    })
  }
  //Tomamos el valor del username del formulario y lo pasamos a la funcion borrar 
  //Luego verificamos si el dato aun existe imprimiendo la lista en consola
  eliminarDatos(){    
    var us = this.formData.get('usuario').value;
    this.conexion.borrarUsuario(us);
    this.mostrarDatos();
  }

  //Creamos un objeto de tipo usuario y le cargamos los datos de formulario
  //Con esto realizado  llamamos la funcion modificar y verificamos el resultado llamando la lista en consola
  modificarDatos(){
    var nuevoUsuario:Usuarios=new Usuarios;
    nuevoUsuario.user=this.formData.get('usuario').value;;
    nuevoUsuario.pass=this.formData.get('password').value;
    nuevoUsuario.correo=this.formData.get('correo').value;
    nuevoUsuario.nomap=this.formData.get('nomap').value;
    this.conexion.modificarUsuario(nuevoUsuario.user,nuevoUsuario);
    this.mostrarDatos();
  }

  //Buscar
  //Creamos una variable que contiene el valor del username
  //Llamamos el metodo BuscarUsuario y le pasamos este username como parametro 
  //Esto nos retorna una promesa que debemos desempacar con un .then 
  //La data entregada la manejaremos como valores de la clase Usuarios y la mostraremos en consola para validar el contenido
  buscarUsuario(){    
    var us = this.formData.get('usuario').value;
    this.conexion.BuscarUsuario(us).then(data =>{
      console.log("Nombre Usuario: "+data.user);
      console.log("Contraseña del Usuario: "+data.pass);
      console.log("Correo Usuario: "+data.correo);
      console.log("Nombre: "+data.nomap);
    });
  }

  //onSubmit sera el metodo de ejecucion del form para llamar la data del formData
  onSubmit() {
    //console.log(this.formData.value);
    //this.mostrar();
    var us = this.formData.get('usuario').value;
    var ps = this.formData.get('password').value;
    var cor = this.formData.get('correo').value;
    var nomap = this.formData.get('nomap').value;
    this.conexion.agregarUsuario(us, ps, cor, nomap);
    this.mostrarDatos();
    this.router.navigate(['/login']);
  }

  //Async genera una funcion que puede ser ejecutada en cualquier momento del proceso de la aplicacion
  //Await genera una accion en espera para poder terminar
  async mostrar() {
    const alert = await this.alertController.create({
      header: "Datos",
      message: "nombreUsuario: " + this.formData.get('usuario').value,
      buttons: ["Aceptar"]
    })
    await alert.present();
  }


}
