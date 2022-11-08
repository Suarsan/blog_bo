import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './public/signin/signin.component';
import { LayoutComponent } from './private/layout/layout.component';
import { PostsComponent } from './private/components/posts/posts.component';
import { AddPostComponent } from './private/components/add-post/add-post.component';
import { AccessGuard } from './guards/access-guard/access.guard';
import { EditPostComponent } from './private/components/edit-post/edit-post.component';
import { SettingsComponent } from './private/components/settings/settings.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '', component: LayoutComponent, canActivate: [AccessGuard], children: [
    { path: '', component: PostsComponent, pathMatch: 'full' },
    { path: 'post', component: AddPostComponent },
    { path: 'post/:postslug', component: EditPostComponent },
    {path: 'settings', component: SettingsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
