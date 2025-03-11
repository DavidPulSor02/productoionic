import { Component, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class EditarPerfilPage {
  nombrePerfil: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  telefonoPerfil: string = '';
  fotoPerfil: string = '/assets/icon/perfilvanguard.png';
  correoPerfil: string = '';
  modoEdicion: boolean = false;
  errores: { [key: string]: boolean } = {};

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private usuarioService: UsuariosService,
    private router: Router,
    private alertController: AlertController
  ) {
    const usuario = this.usuarioService.getUsuario();
    if (usuario) {
      this.nombrePerfil = usuario.user || 'Smith Johnson';
      this.apellidoPaterno = usuario.apellidoPaterno || '';
      this.apellidoMaterno = usuario.apellidoMaterno || '';
      this.telefonoPerfil = usuario.telefono || '';
      this.fotoPerfil = usuario.foto || '/assets/icon/perfilvanguard.png';
      this.correoPerfil = usuario.correo || '';
    }
  }

  async mostrarOpcionesFoto() {
    const alert = await this.alertController.create({
      header: 'Editar Foto de Perfil',
      buttons: [
        { text: 'Tomar Foto', handler: () => this.tomarFoto() },
        { text: 'Seleccionar de Galería', handler: () => this.seleccionarImagen() },
        { text: 'Cancelar', role: 'cancel' }
      ]
    });
    await alert.present();
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    if (image.dataUrl) {
      this.fotoPerfil = image.dataUrl;
    }
  }

  seleccionarImagen() {
    this.fileInput.nativeElement.click();
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoPerfil = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  habilitarEdicion() {
    this.modoEdicion = !this.modoEdicion;
  }

  async guardarPerfil() {
    this.errores = { nombre: false, apellidoPaterno: false, apellidoMaterno: false, telefono: false, correo: false };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (this.nombrePerfil.length > 15) this.errores['nombre'] = true;
    if (this.apellidoPaterno.length > 15) this.errores['apellidoPaterno'] = true;
    if (this.apellidoMaterno.length > 15) this.errores['apellidoMaterno'] = true;
    if (!/^\d{1,10}$/.test(this.telefonoPerfil)) this.errores['telefono'] = true;
    if (!emailRegex.test(this.correoPerfil)) this.errores['correo'] = true;

    if (Object.values(this.errores).includes(true)) {
      this.mostrarAlerta("Corrige los campos resaltados antes de continuar.");
      return;
    }

    let usuario = this.usuarioService.getUsuario();
    if (usuario) {
      usuario.user = this.nombrePerfil;
      usuario.apellidoPaterno = this.apellidoPaterno;
      usuario.apellidoMaterno = this.apellidoMaterno;
      usuario.telefono = this.telefonoPerfil;
      usuario.foto = this.fotoPerfil;
      usuario.correo = this.correoPerfil;
      this.usuarioService.setUsuario(usuario);
      this.usuarioService.saveCurrentUser();
    }
    this.modoEdicion = false;
    this.router.navigate(['/tabs/tab4']);
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error de validación',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  validarTelefono(event: any) {
    let valor = event.detail.value.replace(/\D/g, '');
    this.telefonoPerfil = valor.substring(0, 10);
  }

  navigateToTab4() {
    this.router.navigate(['/tabs/tab4']);
  }
}
