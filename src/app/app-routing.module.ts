import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'home',
    //loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: ':id',  
        loadChildren: () => import('./home/detalle/detalle.module').then(m => m.DetallePageModule)
      },
    ]
  },	
  {
    path: 'add',
    loadChildren: () => import('./viaje/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./viaje/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./viaje/edit/edit.module').then( m => m.EditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
