import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassRessetPageRoutingModule } from './recuperar-routing.module';

import { PassRessetPage } from './recuperar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassRessetPageRoutingModule
  ],
  declarations: [PassRessetPage]
})
export class PassRessetPageModule {}
