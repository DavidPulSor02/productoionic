import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages: { title: string; url: string; icon: string }[] = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Iniciar sesión', url: '/login', icon: 'log-in' },
    { title: 'Escáner QR', url: '/qr-scanner', icon: 'qr-code' },
    { title: 'Perfil', url: '/perfil', icon: 'person-circle' },
    { title: 'Pagos', url: '/payment', icon: 'card' }, // Cambié PayPal por un ícono más general
  ];

  public labels: string[] = [];

  constructor() { }
}
