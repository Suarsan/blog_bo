import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from './guards/access-guard/access.guard';
import { AddPostComponent } from './private/components/add-post/add-post.component';
import { EditPostComponent } from './private/components/edit-post/edit-post.component';
import { PostsComponent } from './private/components/posts/posts.component';
import { SettingsComponent } from './private/components/settings/settings.component';
import { SocialComponent } from './private/components/social/social.component';
import { LayoutComponent } from './private/layout/layout.component';
import { SigninComponent } from './public/signin/signin.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '', component: LayoutComponent, canActivate: [AccessGuard], children: [
    { path: '', component: PostsComponent, pathMatch: 'full' },
    { path: 'post', component: AddPostComponent },
    { path: 'post/:postslug', component: EditPostComponent },
    {path: 'social', component: SocialComponent },
    {path: 'settings', component: SettingsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
