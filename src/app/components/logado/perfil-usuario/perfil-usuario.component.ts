import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit {

  formularioSecao1!: FormGroup;
  formularioSecao2!: FormGroup;
  mensagemErro = '';
  senhaVisivelAtual = false;
  senhaVisivelNova = false;
  iconeSenhaAtual = "./../../../../assets/images/visibility_ON.png";
  iconeSenhaNova = "./../../../../assets/images/visibility_ON.png";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formularioSecao1 = this.formBuilder.group({
      nomeCompleto: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ]+(([\' ][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/), Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')])]
    })
    this.formularioSecao2 = this.formBuilder.group({
      senhaAtual: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      novaSenha: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  habilitarBotaoEditar() : string {
    if(this.formularioSecao1.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }

  habilitarBotaoSenha() : string {
    if(this.formularioSecao2.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }

  mostrarSenha(campo: 'atual' | 'nova') {
    console.log(this.formularioSecao2);
    if(campo === 'atual'){
      this.senhaVisivelAtual = !this.senhaVisivelAtual;
      if (this.senhaVisivelAtual) {
        this.iconeSenhaAtual = "./../../../../assets/images/visibility_OFF.png"
      } else {
        this.iconeSenhaAtual = "./../../../../assets/images/visibility_ON.png"
      }

    } else if (campo === 'nova') {
      this.senhaVisivelNova = !this.senhaVisivelNova;

      if (this.senhaVisivelNova) {
        this.iconeSenhaNova = "./../../../../assets/images/visibility_OFF.png"
      } else {
        this.iconeSenhaNova = "./../../../../assets/images/visibility_ON.png"
      }
    }
  }

}
