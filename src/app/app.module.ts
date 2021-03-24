import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberComponent } from './numbers-yard/number/number.component';
import { NumbersYardComponent } from './numbers-yard/numbers-yard.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    NumbersYardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
