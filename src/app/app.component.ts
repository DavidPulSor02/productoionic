import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Login', url: '/login', icon: 'login' },
    { title: 'ScanSner', url: '/qr-scanner', icon: 'qr-code' },
    { title: 'Perfil', url: '/perfil', icon: 'person-circle' },

  ];
  public labels = [];
  constructor() { }
}
