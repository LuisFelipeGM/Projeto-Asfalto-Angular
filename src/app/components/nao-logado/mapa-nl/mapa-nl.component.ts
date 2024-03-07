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
    maxZoom: 17,
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
  ocorrencias: Ocorrencia[] = [
    {
      id: 1,
      usuarioId: 2,
      latitude: -23.5505,
      longitude: -46.6333,
      enderecoCompleto: "Av. Paulista, 123",
      urlImagem: "https://example.com/image1.jpg",
      logradouro: "Av. Paulista",
      bairro: "Bela Vista",
      cep: "01311-000",
      numero: 123,
      dataOcorrencia: "2024-02-27",
      status: "A"
  },
  {
      id: 2,
      usuarioId: 3,
      latitude: -23.5629,
      longitude: -46.6544,
      enderecoCompleto: "Rua Consolação, 456",
      urlImagem: "https://example.com/image2.jpg",
      logradouro: "Rua Consolação",
      bairro: "Consolação",
      cep: "01305-000",
      numero: 456,
      dataOcorrencia: "2024-02-27",
      status: "A"
  },
  {
      id: 3,
      usuarioId: 4,
      latitude: -23.5733,
      longitude: -46.6233,
      enderecoCompleto: "Parque Ibirapuera",
      urlImagem: "https://example.com/image3.jpg",
      logradouro: "Parque Ibirapuera",
      bairro: "Moema",
      cep: "04029-000",
      numero: 123,
      dataOcorrencia: "2024-02-27",
      status: "A"
  },
  {
      id: 4,
      usuarioId: 5,
      latitude: -23.5489,
      longitude: -46.6388,
      enderecoCompleto: "Estádio do Pacaembu",
      urlImagem: "https://example.com/image4.jpg",
      logradouro: "Estádio do Pacaembu",
      bairro: "Pacaembu",
      cep: "01234-567",
      numero: 789,
      dataOcorrencia: "2024-02-27",
      status: "A"
  },
  {
      id: 5,
      usuarioId: 6,
      latitude: -23.5748,
      longitude: -46.6238,
      enderecoCompleto: "Avenida Brigadeiro Faria Lima, 1234",
      urlImagem: "https://example.com/image5.jpg",
      logradouro: "Av. Brigadeiro Faria Lima",
      bairro: "Itaim Bibi",
      cep: "04538-000",
      numero: 1011,
      dataOcorrencia: "2024-02-27",
      status: "A"
  },
  ];
  markers: MapMarker[] = [];

  constructor(
    private service: OcorrenciaService
  ) { }

  ngOnInit() {
    

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

