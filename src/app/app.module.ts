import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './public/signin/signin.component';
import { LayoutComponent } from './private/layout/layout.component';
import { SigninCardComponent } from './public/components/signin-card/signin-card.component';
import { WelcomeCardComponent } from './public/components/welcome-card/welcome-card.component';
import { SignupCardComponent } from './public/components/signup-card/signup-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LayoutComponent,
    SigninCardComponent,
    WelcomeCardComponent,
    SignupCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
