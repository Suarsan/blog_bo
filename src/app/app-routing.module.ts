import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from './guards/access-guard/access.guard';
import { AddPostComponent } from './private/components/add-post/add-post.component';
import { EditPostComponent } from './private/components/edit-post/edit-post.component';
import { PostsComponent } from './private/components/posts/posts.component';
import { SettingsComponent } from './private/components/settings/settings.component';
import { RrssComponent } from './private/components/rrss/rrss.component';
import { LayoutComponent } from './private/layout/layout.component';
import { SigninComponent } from './public/signin/signin.component';
import { AddRrssComponent } from './private/components/add-rrss/add-rrss.component';
import { EditRrssComponent } from './private/components/edit-rrss/edit-rrss.component';
import { AddRrssDiffusionComponent } from './private/components/add-rrss-diffusion/add-rrss-diffusion.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '', component: LayoutComponent, canActivate: [AccessGuard], children: [
    { path: '', component: PostsComponent, pathMatch: 'full' },
    { path: 'post', component: AddPostComponent },
    { path: 'post/:postslug', component: EditPostComponent },
    { path: 'rrss', component: RrssComponent },
    { path: 'rrss-connection', component: AddRrssComponent },
    { path: 'rrss-connection/:rrssConnectionName', component: EditRrssComponent },
    { path: 'rrss-diffusion', component: AddRrssDiffusionComponent },
    { path: 'settings', component: SettingsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
