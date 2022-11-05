import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from './usuarios';
import { Viajes } from './viajes';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BDDService {
  private storage: SQLiteObject;
  constructor(private platform: Platform, private sqlite: SQLite, private toastController: ToastController) {
    this.databaseConn();
  }
  public datosIniciales() {
    this.storage.executeSql('INSERT INTO users (username,pass,correo,nomap) VALUES ("user1","pass1","test@test.com","Juan Pinga");', [])
      .then(() => {
        alert("user 1 creado");
      }, (e) => {
        alert("Error al insertar user 1");
        alert(e.message);
      });
    this.storage.executeSql('INSERT INTO users (username,pass, correo,nomap) VALUES ("user2","pass2","test@test.com","Marcos Chamber");', [])
      .then(() => {
        alert("user 2 cargado");
      }, (e) => {
        alert("Error al insertar");
        alert(e.message);
      });
    this.storage.executeSql('INSERT INTO viajes (id,nombre,patente,imagen,precio,capacidad,tipoAuto,tipoPago,hora,area) VALUES (1,"Juan Pinga","DGYY69","assets/map-ec.jpg",2500,2,"SUV","Efectivo","25-04-23","Metro Santa lucia");', [])
      .then(() => {
        alert("viaje 1 cargado");
      }, (e) => {
        alert("Error al insertar");
        alert(e.message);
      });
      this.storage.executeSql('INSERT INTO viajes (id,nombre,patente,imagen,precio,capacidad,tipoAuto,tipoPago,hora,area) VALUES (2,"Pedro Pinga","KKSW33","assets/map-zap.jpg",2500,2,"SUV","Efectivo","25-04-23","Metro Santa Zapadores");', [])
      .then(() => {
        alert("viaje 2 cargado");
      }, (e) => {
        alert("Error al insertar");
        alert(e.message);
      });
  }

  //Creacion de Base de datos mas creacion de tablas 
  async databaseConn() {
    await this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'test',
        location: 'default',
      }).then((sqLite: SQLiteObject) => {
        this.storage = sqLite;
        sqLite.executeSql(`
              CREATE TABLE IF NOT EXISTS viajes (
                id number(5), 
                nombre varchar(100),
                patente varchar(10),
                imagen varchar(255),
                precio number(6),
                capacidad number(1),
                tipoAuto string(100),
                tipoPago string(100),
                hora Date,  
                area string(255)
                );
                `, [])
          .then((res) => {
            alert(JSON.stringify(res));
          })
          .catch((error) => alert(JSON.stringify(error)));
        sqLite.executeSql(`
              CREATE TABLE IF NOT EXISTS users (
                username varchar(255), 
                pass varchar(255),
                correo varchar(255),
                nomap varchar(255)
              );
              `, [])
          .then((res) => {
                alert(JSON.stringify(res));
                this.datosIniciales();
              })
              .catch((error) => alert(JSON.stringify(error)));
              
        
      })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }

/*       USUARIOS     */
  //Agregar Usuario
  public agregarUsuario(user, pass, correo, nomap) {
    this.storage.executeSql('INSERT INTO users (username,pass, correo, nomap) VALUES ("' + user + '", "' + pass + '","' + correo + '","' + nomap + '")', [])
      .then(() => {
        this.presentToast("Registro exitoso","alertok-toast","navigate-outline");
      }, (e) => {
        alert("Error al insertar");
        alert(e.message);
      });
  }
  

  //Obtener todos los usuarios
  obtenerUsuarios() {
    return this.storage.executeSql("SELECT * FROM users", []).then((data) => {
      let users: Usuarios[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          users.push({ user: data.rows.item(i).username, pass: data.rows.item(i).pass, correo: data.rows.item(i).correo, nomap: data.rows.item(i).nomap });
        }
      }
      return users;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }


  // Obtener un Dato
  BuscarUsuario(nombreUsuario): Promise<Usuarios> {
    return this.storage.executeSql('SELECT * FROM users WHERE username = ?', [nombreUsuario]).then(res => {
      return {
        user: res.rows.item(0).username,
        pass: res.rows.item(0).pass,
        correo: res.rows.item(0).correo,
        nomap: res.rows.item(0).nomap
      }
    });
  }

  // Update
  modificarUsuario(nombreUsuario, nuevoUsuario: Usuarios) {
    let data = [nuevoUsuario.user, nuevoUsuario.pass, nuevoUsuario.correo];
    return this.storage.executeSql(`UPDATE users SET username = ?, pass = ?,correo=?,nomap=? WHERE username = '${nombreUsuario}'`, data)
      .then(data => {
        this.obtenerUsuarios();
      })
  }
  // Delete
  borrarUsuario(nombreUsuario) {
    return this.storage.executeSql('DELETE FROM users WHERE username = ?', [nombreUsuario])
      .then(_ => {
        console.log("Eliminado Correctamente");
        this.presentToast("Eliminado correctamente","alertok-toast","trash-outline");
        this.obtenerUsuarios();
      });
  }



/*       Viajes     */

  //Agregar Viaje
  public agregarViaje(id, nombre, patente, imagen, precio, capacidad, tipoAuto, tipoPago, hora, area) {
    this.storage.executeSql('INSERT INTO viajes (id,nombre,patente,imagen,precio,capacidad,tipoAuto,tipoPago,hora,area) VALUES ("' + id + '", "' + nombre + '","' + patente + '","' + imagen + '","' + precio + '","' + capacidad + '","' + tipoAuto + '","' + tipoPago + '","' + hora + '","' + area + '")', [])
      .then(() => {
        this.presentToast("Viaje añadido correctamente","alertok-toast","navigate-outline");
      }, (e) => {
        this.presentToast("No se ha podido añadir el viaje","alert-toast","warning-outline");
        alert(e.message);
      });

  }

  //Obtener todos los viajes
  obtenerViajes() {
    return this.storage.executeSql("SELECT * FROM viajes", []).then((data) => {
      let travels: Viajes[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          travels.push({ id: data.rows.item(i).id, nombre: data.rows.item(i).nombre, patente: data.rows.item(i).patente, imagen: data.rows.item(i).imagen, precio: data.rows.item(i).precio, capacidad: data.rows.item(i).capacidad, tipoAuto: data.rows.item(i).tipoAuto, tipoPago: data.rows.item(i).tipoPago, hora: data.rows.item(i).hora, area: data.rows.item(i).area });
        }
      }
      return travels;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }


  // Obtener un Dato
  BuscarViaje(nombreViaje): Promise<Viajes> {
    return this.storage.executeSql('SELECT * FROM viajes WHERE id = ?', [nombreViaje]).then(res => {
      return {
        id: res.rows.item(0).id,
        nombre: res.rows.item(0).nombre,
        patente: res.rows.item(0).patente,
        imagen: res.rows.item(0).imagen,
        precio: res.rows.item(0).precio,
        capacidad: res.rows.item(0).capacidad,
        tipoAuto: res.rows.item(0).tipoAuto,
        tipoPago: res.rows.item(0).tipoPago,
        hora: res.rows.item(0).hora,
        area: res.rows.item(0).area
      }
    });
  }

  // Update
  modificarViaje(idViaje, nuevoidViaje: Viajes) {
    let data = [nuevoidViaje.id,nuevoidViaje.nombre,nuevoidViaje.patente,nuevoidViaje.imagen,nuevoidViaje.precio,nuevoidViaje.capacidad,nuevoidViaje.tipoAuto,nuevoidViaje.tipoPago,nuevoidViaje.hora,nuevoidViaje.area];
    return this.storage.executeSql(`UPDATE viajes SET id = ?, nombre = ?, patente = ?, imagen = ?, precio = ?, capacidad = ?, tipoAuto = ?, tipoPago = ?, hora = ?, area = ? WHERE id = '${idViaje}'`, data)
      .then(data => {
        this.presentToast("Modificado Correctamente","alertok-toast","create-outline");
        this.obtenerViajes();
      })
  }
  // Delete
  borrarViaje(idViaje) {
    return this.storage.executeSql('DELETE FROM viajes WHERE id = ?', [idViaje])
      .then(_ => {
        console.log("Eliminado Correctamente");
        this.presentToast("Eliminado correctamente","alertok-toast","trash-outline");
        this.obtenerViajes();
      });
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
