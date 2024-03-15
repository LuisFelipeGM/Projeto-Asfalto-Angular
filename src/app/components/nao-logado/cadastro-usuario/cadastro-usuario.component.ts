import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Usuario } from '../../../core/services/usuario';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent implements OnInit {

  formulario!: FormGroup;
  mensagemErro = '';
  senhaVisivel = false;
  iconeSenha = "./../../../../assets/images/visibility_ON.png";
  usuario!: Usuario;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: UsuarioService
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nomeCompleto: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ]+(([\' ][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/), Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  criarUsuario() {
    if(this.formulario.valid) {
      this.usuario = {
        nomeCompleto: this.formulario.value.nomeCompleto,
        cpf: this.formulario.value.cpf.trim(),
        email: this.formulario.value.email,
        senha: this.formulario.value.senha,
      }
      this.service.criar(this.usuario).subscribe({
        next: () => this.router.navigate(['/login'], { queryParams: { cadastroSucesso: true } }),
        error: erro => {
          if(erro.status == 0){
            this.mensagemErro = 'Ocorreu um erro de comunicação com o servidor, tente novamente mais tarde!'
          } else if (erro.status == 400) {
            this.mensagemErro = `Erro ao salvar: ${erro.error[0]}`;
          }
        }
      })
    }
  }

  cancelar() {
    this.router.navigate(['/home']);
  }

  habilitarBotao() : string {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }

  mostrarSenha() {
    this.senhaVisivel = !this.senhaVisivel;
    if (this.senhaVisivel) {
      this.iconeSenha = "./../../../../assets/images/visibility_OFF.png"
    } else {
      this.iconeSenha = "./../../../../assets/images/visibility_ON.png"
    }
  }

}
