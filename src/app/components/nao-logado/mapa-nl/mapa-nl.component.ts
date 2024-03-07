import { Component, OnInit, ViewChild } from '@angular/core';
import { OcorrenciaService } from '../../services/ocorrencia.service';
import { Ocorrencia } from '../../services/ocorrencia';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-mapa-nl',
  templateUrl: './mapa-nl.component.html',
  styleUrl: './mapa-nl.component.css'
})
export class MapaNlComponent implements OnInit {

  zoom = 13;
  center: google.maps.LatLngLiteral = {lat: -23.557548, lng: -46.638341};
  optionsMap: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    maxZoom: 17,
    minZoom: 8,
    streetViewControl: false
  };
  ocorrencias: Ocorrencia[] = [];
  markers: any[] = [];

  constructor(
    private service: OcorrenciaService
  ) { }

  ngOnInit() {
    this.service.listarOcorrenciasPorStatus("A").subscribe((listaOcorrencias) => {
      this.ocorrencias = listaOcorrencias;
      this.ocorrencias.forEach((ocorrencia) => {
        this.markers.push({
          position:{lat: parseFloat(ocorrencia.latitude), lng: parseFloat(ocorrencia.longitude)},
        })
      })
    })

  }



}

