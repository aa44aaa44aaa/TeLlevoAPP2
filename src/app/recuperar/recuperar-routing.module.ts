import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassRessetPage } from './recuperar.page';

const routes: Routes = [
  {
    path: '',
    component: PassRessetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassRessetPageRoutingModule {}
