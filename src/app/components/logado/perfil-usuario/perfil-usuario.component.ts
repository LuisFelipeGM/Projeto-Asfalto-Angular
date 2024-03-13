import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SenhaUpdate, Usuario, UsuarioUpdate } from '../../services/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { TokenService } from '../../services/token.service';

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

  id: any;
  token: string = '';
  usuarioUpdate!: UsuarioUpdate;
  senhaUpdate!: SenhaUpdate;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private usuarioService: UsuarioService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken(); 
    this.userService.retornarUser().subscribe((usuario) => {
      this.id = usuario?.id;
      this.usuarioService.buscarPorId(this.id, this.token).subscribe((usuario) => {
        
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
      this.usuarioService.editar(this.id, this.usuarioUpdate, this.token).subscribe((usuario) => {
        console.log(usuario);
      })
    }
  }

  editarSenha() {
    if(this.formularioSecao2.valid) {
      this.senhaUpdate = {
        senhaAntiga: this.formularioSecao2.value.senhaAtual,
        novaSenha: this.formularioSecao2.value.novaSenha,
      }
      this.usuarioService.editarSenha(this.id, this.senhaUpdate, this.token).subscribe((usuario) => {
        const jsonResponse = JSON.parse(usuario);
        console.log(jsonResponse);
      })
    }
  }

}


