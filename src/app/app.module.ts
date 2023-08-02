import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './public/signin/signin.component';
import { LayoutComponent } from './private/layout/layout.component';
import { SigninCardComponent } from './public/components/signin-card/signin-card.component';
import { WelcomeCardComponent } from './public/components/welcome-card/welcome-card.component';
import { SignupCardComponent } from './public/components/signup-card/signup-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AsideComponent } from './private/components/aside/aside.component';
import { HeaderComponent } from './private/components/header/header.component';
import { PostsComponent } from './private/components/posts/posts.component';
import { AddPostComponent } from './private/components/add-post/add-post.component';
import { EditPostComponent } from './private/components/edit-post/edit-post.component';
import { SettingsComponent } from './private/components/settings/settings.component';
import { RrssComponent } from './private/components/rrss/rrss.component';
import { AddRrssComponent } from './private/components/add-rrss/add-rrss.component';
import { EditRrssComponent } from './private/components/edit-rrss/edit-rrss.component';
import { RrssConnectionComponent } from './private/components/rrss-connection/rrss-connection.component';
import { AddRrssDiffusionComponent } from './private/components/add-rrss-diffusion/add-rrss-diffusion.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LayoutComponent,
    SigninCardComponent,
    WelcomeCardComponent,
    SignupCardComponent,
    AsideComponent,
    HeaderComponent,
    PostsComponent,
    AddPostComponent,
    EditPostComponent,
    SettingsComponent,
    RrssComponent,
    RrssConnectionComponent,
    AddRrssComponent,
    EditRrssComponent,
    AddRrssDiffusionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
