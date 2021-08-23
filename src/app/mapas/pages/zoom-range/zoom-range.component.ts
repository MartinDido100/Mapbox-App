import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container{
        width: 100%;
        height: 100%;
      }

      .row{
        background: white;
        position: fixed;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        border-radius: 5px;
        z-index: 99900;
        width: 400px;
      }

      button{
        width: 40px;
        height: 40px;
      }
    `
  ]
})

export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  //Haciendo esto podes tener muchos mapas que no dependan del id
  zoomLevel: number = 15;
  center: number[] = [ -58.59191341034239 , -34.65963943279471];
  mapa!: mapboxgl.Map;

  constructor() { }


  ngOnDestroy(): void {
    this.mapa.off('zoom',()=>{});
    this.mapa.off('zommend',()=>{});
    this.mapa.off('move',()=>{});
    //Destruyo los listeners cuando se destruye el componente
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [ -58.59191341034239 , -34.65963943279471],
    zoom: this.zoomLevel
    });

    this.mapa.on('zoom',(e)=>{//Evento zoom del mapbox
      const zoom = this.mapa.getZoom();
      this.zoomLevel = zoom;
    })

    this.mapa.on('zoomend',(e)=>{//Evento zoom del mapbox
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18)
      }
    })

    this.mapa.on('move',(e)=>{
      const { lng , lat } = e.target.getCenter();
      this.center = [ lng ,lat ]
    })

  }

  zoomIn(){
    this.mapa.zoomIn()
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomOut(){
    this.mapa.zoomOut()
    this.zoomLevel = this.mapa.getZoom();
  }

  cambioRange( valor: string ){
    this.mapa.zoomTo( parseInt(valor) )
  }

}
