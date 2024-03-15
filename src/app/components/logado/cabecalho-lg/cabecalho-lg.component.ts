import { Component, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-cabecalho-lg',
  templateUrl: './cabecalho-lg.component.html',
  styleUrl: './cabecalho-lg.component.css'
})
export class CabecalhoLgComponent {

  @Input() selecionado!: string;

  constructor(
    private elementRef: ElementRef, 
    private renderer: Renderer2,
    private router: Router,
    private userService: UserService
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

  logout() {
    this.userService.logout();
    this.router.navigate(['/home'])
  }

}
