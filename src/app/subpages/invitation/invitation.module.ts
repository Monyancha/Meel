import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';

import { InvitationPage } from './invitation.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYq0XB4TWCDdKS9gWGaeb2B4q0HeVTS5M'
    })
  ],
  declarations: [InvitationPage]
})
export class InvitationPageModule {}
