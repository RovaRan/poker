import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { ButtonComponent } from './components/button/button.component';
import { AddValueComponent } from './components/add-value/add-value.component';
import { FormsModule } from '@angular/forms';

import { WebsocketService } from './websocket.service'
import { GameService } from './game.service';
import { TextBoxComponent } from './components/text-box/text-box.component';
import { AddUserComponent } from './components/add-user/add-user.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ButtonComponent,
    AddValueComponent,
    TextBoxComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    WebsocketService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
