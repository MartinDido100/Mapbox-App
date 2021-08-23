import { Component, OnInit } from '@angular/core';

interface Menu{
  ruta: string,
  nombre: string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li{
        cursor: pointer;
      }
    `
  ]
})
export class MenuComponent{

  menu: Menu[] = [
    {
      ruta: './mapas/fullscreen',
      nombre: 'FullScreen'
    },
    {
      ruta: './mapas/zoom',
      nombre: 'Zoom'
    },
    {
      ruta: './mapas/marcadores',
      nombre: 'Marcadores'
    },
    {
      ruta: './mapas/propiedades',
      nombre: 'Propiedades'
    },
  ]


  constructor() { }


}
