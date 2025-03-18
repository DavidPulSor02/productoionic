import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { }

  // Iniciar sesión con email y contraseña
  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Registrar nuevo usuario con email y contraseña
  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Iniciar sesión con Google
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }
  loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Cerrar sesión
  async logout() {
    return this.auth.signOut();
  }
}
