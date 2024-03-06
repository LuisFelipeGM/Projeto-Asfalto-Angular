import { Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent implements OnChanges {
  
  @Input() selecionado!: string;

  constructor(
    private elementRef: ElementRef, 
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.adicionarClasseAtivo(changes['selecionado'].currentValue);
  }

  adicionarClasseAtivo(classe: string){
    const elementos = this.elementRef.nativeElement.querySelectorAll(`a.${classe}`);
    elementos.forEach((elemento: HTMLElement) => {
      this.renderer.addClass(elemento, 'ativo');
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

}
