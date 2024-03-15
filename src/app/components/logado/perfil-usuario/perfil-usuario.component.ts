import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { SenhaUpdate, Usuario, UsuarioUpdate } from '../../../core/services/usuario';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit {

  formularioSecao1!: FormGroup;
  formularioSecao2!: FormGroup;
  mensagemErroEditar = '';
  mensagemErroSenha = '';
  mensagemSucessoEditar = '';
  mensagemSucessoSenha = '';
  senhaVisivelAtual = false;
  senhaVisivelNova = false;
  iconeSenhaAtual = "./../../../../assets/images/visibility_ON.png";
  iconeSenhaNova = "./../../../../assets/images/visibility_ON.png";

  id: any;
  usuarioUpdate!: UsuarioUpdate;
  senhaUpdate!: SenhaUpdate;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.userService.retornarUser().subscribe((usuario) => {
      this.id = usuario?.id;
      this.usuarioService.buscarPorId(this.id).subscribe((usuario) => {
        
        this.formularioSecao1.patchValue({
          nomeCompleto: usuario.nomeCompleto,
          cpf: usuario.cpf.trim(),
          email: usuario.email
        });

      })
    })
    
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

  editarUsuario() {
    if(this.formularioSecao1.valid) {
      this.usuarioUpdate = {
        nomeCompleto: this.formularioSecao1.value.nomeCompleto,
        cpf: this.formularioSecao1.value.cpf,
        email: this.formularioSecao1.value.email,
        tipoUsuario: "U"
      }
      this.usuarioService.editar(this.id, this.usuarioUpdate).subscribe({
        next: () => {
          this.mensagemErroEditar = ''
          this.mensagemSucessoEditar = 'Edição realizada com sucesso!'
        },
        error: erro => {
          this.mensagemSucessoEditar = ''
          if(erro.status == 0){
            this.mensagemErroEditar = 'Ocorreu um erro de comunicação com o servidor, tente novamente mais tarde!'
          } else {
            this.mensagemErroEditar = `Erro ao salvar: ${erro.error[0]}`;
          }
        }
      })
    }
  }

  editarSenha() {
    if(this.formularioSecao2.valid) {
      this.senhaUpdate = {
        senhaAntiga: this.formularioSecao2.value.senhaAtual,
        novaSenha: this.formularioSecao2.value.novaSenha,
      }
      this.usuarioService.editarSenha(this.id, this.senhaUpdate).subscribe({
        next: (message) => {
          this.mensagemSucessoSenha = message.message;
          this.mensagemErroSenha = '';
          this.formularioSecao2.reset();
        },
        error: (err) => {
          this.mensagemSucessoSenha = ''
          this.mensagemErroSenha = err.error
        }
      })
    }
  }

}


