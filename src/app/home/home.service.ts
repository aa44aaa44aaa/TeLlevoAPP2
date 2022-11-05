import { Injectable } from '@angular/core';
import { Homes } from './homes';
import { MenuController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private conductor: Homes[] = [
    {
      id        : '1',
      nombre    : 'Benjamin Reichwald',
      patente   : 'MC●TE●66',
      imagen    : 'assets/map-ec.jpg',
      precio    : 1580,
      capacidad : 2,
      tipoAuto  : 'SUV',
      tipoPago  : 'Transferencia',
      hora      : '15:20',
      area      : 'Metro Estacion Central'
    },
    {
      id        : '2',
      nombre    : 'Ludwig Rosenberg',
      patente   : 'PQ●ZG●32',
      imagen    : 'assets/map-zap.jpg',
      precio    : 2000,
      capacidad : 1,     
      tipoAuto  : 'Sedan',
      tipoPago  : 'Efectivo',
      hora      : '11:00',
      area      : 'Metro Zapadores'
    },
    {
      id        : '3',
      nombre    : 'Leandoer Håstad',
      patente   : 'PQ●ZG●32',
      imagen    : 'assets/map-sl.jpg',
      precio    : 1000,
      capacidad : 1,     
      tipoAuto  : 'Moto',
      tipoPago  : 'Efectivo',
      hora      : '11:50',
      area      : 'Santa Lucia'
    },

  ]

  
  constructor() { }

  obtenerHomes() {
    return [...this.conductor]
  }

  obtenerHome(id: string) {
    return {
      ...this.conductor.find(aux => {
        return aux.id === id
      })
    }
  }

  agregarHome(nombre: string, patente: string, imagen: string, precio: number, capacidad: number, tipoAuto: string, tipoPago: string, hora: string, area: string) {
    this.conductor.push({
      nombre, patente, imagen, precio, capacidad, tipoAuto, tipoPago, hora , area , id: this.conductor.length + 1 + ""
    })
  }

  eliminarHome(id: string) {
    this.conductor = this.conductor.filter(aux => {

      return aux.id !== id 
    })
  }

}
