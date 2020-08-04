import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: []
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarUsuario = true;


  constructor( private authService: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
    }
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }
    // Iniciamos el mensaje de carga al usuario

    // Mostramos el icono de carga

    console.log('Formulario enviado: ', this.usuario);
    console.log(form);
    this.authService.registrarNuevoUsuario(this.usuario).subscribe(res => {
      console.log(res);
      // Removemos el mensaje de carga al usuario


      if ( this.recordarUsuario) {
        localStorage.setItem('email', this.usuario.email);
      }

      // Redirigimos al usuario al Home
      this.router.navigateByUrl('home');
    }, (erro) => {
      console.log(erro.error.error.message);

    });

  }


}
