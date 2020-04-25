import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './public/signin/signin.component';
import { LayoutComponent } from './private/layout/layout.component';


const routes: Routes = [
  { path: 'signin', component: SigninComponent, pathMatch: 'full' },
  { path: '', component: LayoutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
