import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioComponent } from './usuario/usuario.component';
import { ConcursoComponent } from './concurso/concurso.component';

const routes: Routes = [
  {
    path: 'login',
    component: UsuarioComponent
  },
  {
    path: 'concurso',
    component: ConcursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
