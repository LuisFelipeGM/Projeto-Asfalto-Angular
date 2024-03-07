import { Component, OnInit, ViewChild } from '@angular/core';
import { OcorrenciaService } from '../../services/ocorrencia.service';
import { Info, Ocorrencia } from '../../services/ocorrencia';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-mapa-nl',
  templateUrl: './mapa-nl.component.html',
  styleUrl: './mapa-nl.component.css'
})
export class MapaNlComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  zoom = 13;
  center: google.maps.LatLngLiteral = {lat: -23.557548, lng: -46.638341};
  optionsMap: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    maxZoom: 19,
    minZoom: 8,
    streetViewControl: false
  };
  infoContent:Info = {
    url: "",
    endereco: "",
    cep: "",
    data: "",
    status: ""
  };
  ocorrencias: Ocorrencia[] = [];

  constructor(
    private service: OcorrenciaService
  ) { }

  ngOnInit() {
    this.service.listarOcorrenciasPorStatus("A").subscribe({
      next: (listaOcorrencias) => this.ocorrencias = listaOcorrencias
    } )

  }

  openInfoWindow(marker: MapMarker, ocorrencia: Ocorrencia) {
    if (marker instanceof MapMarker) {
      this.infoContent = {
        url: ocorrencia.urlImagem,
        endereco: ocorrencia.enderecoCompleto,
        cep: ocorrencia.cep,
        data: ocorrencia.dataOcorrencia,
        status: "Ocorrência Ativa"
      };
      this.infoWindow.open(marker);
    } else {
      console.error('Marker is not an instance of MapMarker:', marker);
    }
  }



}

