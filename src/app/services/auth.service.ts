import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDMW2IsSTjqEztwP86hEA2Z-qCmxd4Gf3A';
  private userToken: string;

  constructor(private http: HttpClient) { this.leerToken(); }

  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Inicio de sesion o login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  logOut() {
    localStorage.removeItem('token');
  }

  logIn(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.httpUrl}signInWithPassword?key=${this.apiKey}`, authData)
      .pipe(
      map( (resp: any) => {
         console.log('Entrando en el mapa del RXJS');
         this.guardarToken(resp.idToken, resp.expiresIn);
         return resp;
      })
    );
  }

  registrarNuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      // emaial : usuario.email,
      // password: usuario.password,
      // returnSecureToken: true
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.httpUrl}signUp?key=${this.apiKey}`, authData
     ).pipe(
       map( (resp: any) => { // Solo se ejecuta si no tenemos error en la peticion
          console.log('Entrando en el mapa del RXJS');
          this.guardarToken(resp.idToken, resp.expiresIn);
          return resp; // Debemos retornar la respuesta nuevamente
       })
     );
  }

  private guardarToken(idToken: string, expiresIn: number) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    const hoy: Date = new Date();
    hoy.setSeconds(expiresIn);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(): string {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    if ( this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if(expiraDate > new Date()){
      return true;
    } else {
      return false;
    }

  }


}
