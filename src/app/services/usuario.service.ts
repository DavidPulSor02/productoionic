import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private usuario: any = null;

  constructor() {
    this.cargarUsuarioDesdeLocalStorage();
  }

  // Obtener usuario
  getUsuario(): any {
    return this.usuario;
  }

  // Establecer usuario
  setUsuario(usuario: any) {
    this.usuario = usuario;
    this.guardarUsuarioEnLocalStorage();
  }

  // Guardar usuario en localStorage
  private guardarUsuarioEnLocalStorage() {
    if (this.usuario) {
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
    }
  }

  // Cargar usuario desde localStorage
  private cargarUsuarioDesdeLocalStorage() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
  }

  // Método para simular autenticación y asignar usuario
  loginUsuario(datosUsuario: any) {
    this.usuario = datosUsuario;
    this.guardarUsuarioEnLocalStorage();
  }

  // Método para cerrar sesión y limpiar usuario
  logoutUsuario() {
    this.usuario = null;
    localStorage.removeItem('usuario');
  }

  // Método para actualizar y guardar el usuario actual
  saveCurrentUser() {
    this.guardarUsuarioEnLocalStorage();
  }
}
