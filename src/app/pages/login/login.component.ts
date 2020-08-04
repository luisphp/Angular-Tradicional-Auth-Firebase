import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarUsuario = true;

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
    }
  }

  login( form: NgForm) {
    if (form.invalid) {
      return;
    }


    console.log('Formulario enviado: ', this.usuario);
    console.log(form);
    this.authService.logIn(this.usuario).subscribe(res => {
      console.log(res);
      if (this.recordarUsuario) {
        localStorage.setItem('email', this.usuario.email);
      }

      // Redirigimos al usuario al Home
      this.router.navigateByUrl('home');
    }, (erro) => {
      console.log(erro.error.error.message);
    });
  }

}
