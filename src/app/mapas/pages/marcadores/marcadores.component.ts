import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

interface MarcadorColor  {
  color: string,
  marker?: mapboxgl.Marker,
  centro?: [number,number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container{
        width: 100%;
        height: 100%;
      }

      .list-group{
        position: fixed;
        top:20px;
        right:20px;
        z-index: 999;
      }

      li{
        cursor: pointer;
        user-select:none;
      }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  zoomLevel: number = 15;
  center: [number,number] = [ -58.59191341034239 , -34.65963943279471];
  mapa!: mapboxgl.Map;


  marcadores: MarcadorColor[] = [];

  constructor() { }


  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [ -58.59191341034239 , -34.65963943279471],
    zoom: this.zoomLevel
    });
  
    this.leerMarcadores()

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo'

    // new mapboxgl.Marker({
    //   // element: markerHtml//Personalizas tus markers
    // })
    //     .setLngLat(this.center)
    //     .addTo(this.mapa)

  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
          .setLngLat(this.mapa.getCenter())
          .addTo(this.mapa);
    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    
    this.guardarMarcadores();

    nuevoMarcador.on('dragend',()=>{
      this.guardarMarcadores();
    })
  }

  irMarcador(marker: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }

  guardarMarcadores(){
    const lngLatArr: MarcadorColor[] = []

    this.marcadores.forEach(m => {
      const color = m. color;
      const { lng , lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        centro: [lng , lat]
      });

    });
    localStorage.setItem('marcadores',JSON.stringify(lngLatArr));
  }

  leerMarcadores(){
    if(!localStorage.getItem('marcadores')){
      return;
    }

    const markers: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    markers.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);
      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend',()=>{
        this.guardarMarcadores();
      })

    });
    
  }

  borrarMarcador(index : number){
    this.marcadores[index].marker?.remove();
    this.marcadores.splice(index,1);
    this.guardarMarcadores();
  }

}
