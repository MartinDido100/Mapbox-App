import { AfterViewInit, Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-minimapa',
  templateUrl: './minimapa.component.html',
  styles: [

    `
      .divMapa{
        width:100%;
        height: 150px;
        margin: 0;
      }
    `
  ]
})
export class MinimapaComponent implements AfterViewInit {


  @Input() lngLat: [number,number] = [0,0]
  @ViewChild('mapa') divMapa!: ElementRef

  constructor() { }

  ngAfterViewInit(): void {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.lngLat,
    zoom:16,
    interactive: false
    });
  
    const marker = new mapboxgl.Marker({
      color
    })
    .setLngLat(this.lngLat)
    .addTo(mapa)
  }


}
