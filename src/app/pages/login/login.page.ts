import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // ✅ Importa el Router
import { NavController } from '@ionic/angular'; // ✅ Importa NavController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';
  isValidForm: boolean = false;
  constructor(private authService: AuthService, private router: Router, private navCtrl: NavController) { } // ✅ Inyecta el Router y NavController

  validateForm() {
    this.emailError = '';
    this.passwordError = '';
    this.isValidForm = true;

    if (!this.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      this.emailError = 'Correo electrónico no válido';
      this.isValidForm = false;
    }

    if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
      this.isValidForm = false;
    }
  }

  /**
   * Iniciar sesión con correo y contraseña
   */
  /**
 * Iniciar sesión con correo y contraseña
 */
  login() {
    if (!this.isValidForm) return;

    // Redirige a home antes de autenticar
    this.navCtrl.navigateRoot(['/home']);

    this.authService.login(this.email, this.password)
      .then(user => {
        console.log('Usuario autenticado:', user);
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        // Opcional: Volver a login si hay un error
        this.navCtrl.navigateRoot(['/login']);
      });
  }

  /**
   * Registrarse con correo y contraseña
   */
  register() {
    if (!this.isValidForm) return;

    // Redirige a home antes de registrar
    this.navCtrl.navigateRoot(['/home']);

    this.authService.register(this.email, this.password)
      .then(user => {
        console.log('Usuario registrado:', user);
      })
      .catch(error => {
        console.error('Error al registrar:', error);
        // Opcional: Volver a login si hay un error
        this.navCtrl.navigateRoot(['/login']);
      });
  }

  /**
   * Iniciar sesión con Google
   */
  loginWithGoogle() {
    // Redirige a home antes de autenticar con Google
    this.navCtrl.navigateRoot(['/home']);

    this.authService.loginWithGoogle()
      .then(user => {
        console.log('Autenticado con Google:', user);
      })
      .catch(error => {
        console.error('Error con Google:', error);
        this.navCtrl.navigateRoot(['/login']);
      });
  }

  /**
   * Iniciar sesión con Facebook
   */
  loginWithFacebook() {
    // Redirige a home antes de autenticar con Facebook
    this.navCtrl.navigateRoot(['/home']);

    this.authService.loginWithFacebook()
      .then(user => {
        console.log('Autenticado con Facebook:', user);
      })
      .catch(error => {
        console.error('Error con Facebook:', error);
        this.navCtrl.navigateRoot(['/login']);
      });
  }

}
