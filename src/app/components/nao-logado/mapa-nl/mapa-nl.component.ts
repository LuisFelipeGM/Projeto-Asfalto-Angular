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
    minZoom: 10,
    streetViewControl: false,
    clickableIcons: false
  };
  infoContent:Info = {
    url: "",
    endereco: "",
    bairro: "",
    cep: "",
    data: "",
    status: ""
  };
  ocorrencias: Ocorrencia[] = [];
  rankingBairros: { bairro: string, quantidade: number }[] = [];
  ocorrenciasFiltradas: Ocorrencia[] = [];
  bairroAtivo: string = '';

  constructor(
    private service: OcorrenciaService
  ) { }

  ngOnInit() {
    this.service.listarOcorrenciasPorStatus("A").subscribe({
      next: (listaOcorrencias) => {
        this.ocorrencias = listaOcorrencias;
        this.calcularRankingBairros();
        this.filtrarOcorrenciasPorBairro('');
      },
      
    } )

  }

  openInfoWindow(marker: MapMarker, ocorrencia: Ocorrencia) {
    if (marker instanceof MapMarker) {
      this.infoContent = {
        url: ocorrencia.urlImagem,
        endereco: ocorrencia.enderecoCompleto,
        bairro: ocorrencia.bairro,
        cep: ocorrencia.cep,
        data: ocorrencia.dataOcorrencia,
        status: "Ocorrência Ativa"
      };
      this.infoWindow.open(marker);
    } else {
      console.error('Marker is not an instance of MapMarker:', marker);
    }
  }

  private calcularRankingBairros() {
    const bairrosMap: Map<string, number> = new Map();
    this.ocorrencias.forEach((ocorrencia) => {
      const bairro = ocorrencia.bairro;
      const quantidade = bairrosMap.get(bairro) || 0;
      bairrosMap.set(bairro, quantidade + 1);
    });

    this.rankingBairros = Array.from(bairrosMap.entries())
      .map(([bairro, quantidade]) => ({ bairro, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }

  filtrarOcorrenciasPorBairro(bairro: string) {
    this.bairroAtivo = this.bairroAtivo === bairro ? '' : bairro;
    this.ocorrenciasFiltradas = bairro 
      ? this.ocorrencias.filter(ocorrencia => ocorrencia.bairro === bairro) : this.ocorrencias;
  }



}

