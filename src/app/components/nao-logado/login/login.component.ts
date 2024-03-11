import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;
  mensagemErro = '';
  senhaVisivel = false;
  iconeSenha = "./../../../../assets/images/visibility_ON.png";
  cadastroLogin = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: UsuarioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['cadastroSucesso']){
        this.cadastroLogin = true;
      }
    })
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  logar() {
    if(this.formulario.valid){
      alert("LOGADO!");
    }
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
