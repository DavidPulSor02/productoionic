import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  async login() {
    this.loading = true;
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']); // Redirige a la página principal
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error al iniciar sesión');
    }
    this.loading = false;
  }
}
