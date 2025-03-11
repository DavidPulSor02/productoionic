import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditarPerfilPage } from './perfil.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  // 👈 Importa IonicModule aquí
    RouterModule.forChild([{ path: '', component: EditarPerfilPage }])
  ],
  declarations: [EditarPerfilPage]
})
export class PerfilPageModule { }
