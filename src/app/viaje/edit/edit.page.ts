import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BDDService } from '../../servicios/bdd.service';
import { Viajes } from '../../servicios/viajes';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  private ListViajes : any;
  handlerMessage = '';
  roleMessage = '';
    //Se genera variable de tipo formgroup como formulario
    private formData: FormGroup
    //Generaremos una variable viaje para almacenar de manera persistente el valor de los usuarios entregados por la BDD
    private viaje: Viajes[] = [];

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

  onSubmit() {
    var nuevoViaje:Viajes=new Viajes;
    nuevoViaje.id=this.formData.get('id').value;;
    nuevoViaje.nombre=this.formData.get('nombre').value;
    nuevoViaje.patente=this.formData.get('patente').value;
    nuevoViaje.precio=this.formData.get('precio').value;
    nuevoViaje.imagen="assets/map-zap.jpg"
    nuevoViaje.capacidad=this.formData.get('capacidad').value;
    nuevoViaje.tipoAuto=this.formData.get('tipoAuto').value;
    nuevoViaje.tipoPago=this.formData.get('tipoPago').value;
    nuevoViaje.hora=this.formData.get('hora').value;
    nuevoViaje.area=this.formData.get('area').value;
    this.conexion.modificarViaje(this.ListViajes.id,nuevoViaje);
    this.router.navigate(['/home']);
  }
}