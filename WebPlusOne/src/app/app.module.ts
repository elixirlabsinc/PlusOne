import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    OnboardingComponent,
    MainComponent,
    FooterComponent,
    ChatComponent,
    ProfileComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'onboarding',
        component: OnboardingComponent
      },
      {
        path: 'home',
        component: MainComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'message',
        component: MessageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
