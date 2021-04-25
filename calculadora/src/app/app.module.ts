import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {CalculadoraModule} from './calculadora';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CalculadoraModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
