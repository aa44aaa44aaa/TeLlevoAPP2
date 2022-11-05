import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { BDDService } from '../../servicios/bdd.service';
import { Viajes } from '../../servicios/viajes';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  //Se genera variable de tipo formgroup como formulario
  private formData: FormGroup
  //Generaremos una variable viaje para almacenar de manera persistente el valor de los usuarios entregados por la BDD
  private viaje: Viajes[] = [];
  constructor(private router: Router, private alertController: AlertController, private conexion: BDDService) {
  }
  
  //Se inicializa en funcion ngOnInit como nuevo formgroup con estructura json declarando cada variable como un formcontrol
  ngOnInit() {
    this.formData = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      patente: new FormControl(),
      imagen: new FormControl(),
      precio: new FormControl(),
      capacidad: new FormControl(),
      tipoAuto: new FormControl(),
      tipoPago: new FormControl(),
      hora: new FormControl(),
      area: new FormControl()
    })

  }
  //Metodo para imprimir todos los datos 
  //Junton con la estructura de como traer un array con todos los datos de la BDD
  mostrarDatos() {
    this.conexion.obtenerViajes().then(data => {
      this.viaje = data;
      this.viaje.forEach(tmp => {
        console.log("ID: "+tmp.id);
        console.log("Nombre: "+tmp.nombre);
        console.log("Patente: "+tmp.patente);
        console.log("Precio: "+tmp.precio);
        console.log("Capacidad: "+tmp.capacidad);
        console.log("tipoAuto: "+tmp.tipoAuto);
        console.log("tipoPago: "+tmp.tipoPago);
        console.log("hora: "+tmp.hora);
        console.log("area: "+tmp.area);
      });
    })
  }
  //Tomamos el valor del username del formulario y lo pasamos a la funcion borrar 
  //Luego verificamos si el dato aun existe imprimiendo la lista en consola
  eliminarDatos(){    
    var us = this.formData.get('id').value;
    this.conexion.borrarViaje(us);
    this.mostrarDatos();
  }

  //Creamos un objeto de tipo usuario y le cargamos los datos de formulario
  //Con esto realizado  llamamos la funcion modificar y verificamos el resultado llamando la lista en consola
  modificarDatos(){
    var nuevoViaje:Viajes=new Viajes;
    nuevoViaje.id=this.formData.get('id').value;;
    nuevoViaje.nombre=this.formData.get('nombre').value;
    nuevoViaje.patente=this.formData.get('patente').value;
    nuevoViaje.precio=this.formData.get('precio').value;
    nuevoViaje.capacidad=this.formData.get('capacidad').value;
    nuevoViaje.tipoAuto=this.formData.get('tipoAuto').value;
    nuevoViaje.tipoPago=this.formData.get('tipoPago').value;
    nuevoViaje.hora=this.formData.get('hora').value;
    nuevoViaje.area=this.formData.get('area').value;
    this.conexion.modificarViaje(nuevoViaje.id,nuevoViaje);
    this.mostrarDatos();
  }

  //Buscar
  //Creamos una variable que contiene el valor del username
  //Llamamos el metodo BuscarUsuario y le pasamos este username como parametro 
  //Esto nos retorna una promesa que debemos desempacar con un .then 
  //La data entregada la manejaremos como valores de la clase Usuarios y la mostraremos en consola para validar el contenido
  buscarViaje(){    
    var us = this.formData.get('id').value;
    this.conexion.BuscarViaje(us).then(tmp =>{
        console.log("ID: "+tmp.id);
        console.log("Nombre: "+tmp.nombre);
        console.log("Patente: "+tmp.patente);
        console.log("Precio: "+tmp.precio);
        console.log("Capacidad: "+tmp.capacidad);
        console.log("tipoAuto: "+tmp.tipoAuto);
        console.log("tipoPago: "+tmp.tipoPago);
        console.log("hora: "+tmp.hora);
        console.log("area: "+tmp.area);
    });
  }

  //onSubmit sera el metodo de ejecucion del form para llamar la data del formData
  onSubmit() {
    //console.log(this.formData.value);
    //this.mostrar();
    var id = this.formData.get('id').value;;
    var nombre = this.formData.get('nombre').value;
    var patente = this.formData.get('patente').value;
    var precio = this.formData.get('precio').value;
    var imagen = "assets/map-zap.jpg"
    var capacidad = this.formData.get('capacidad').value;
    var tipoAuto = this.formData.get('tipoAuto').value;
    var tipoPago = this.formData.get('tipoPago').value;
    var hora = this.formData.get('hora').value;
    var area = this.formData.get('area').value;
    this.conexion.agregarViaje(id, nombre, patente, imagen, precio, capacidad, tipoAuto, tipoPago, hora, area);
    this.mostrarDatos();
    this.router.navigate(['/home']);
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
