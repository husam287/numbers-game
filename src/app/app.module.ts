import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberComponent } from './numbers-yard/number/number.component';
import { NumbersYardComponent } from './numbers-yard/numbers-yard.component';
import { MovesComponent } from './moves/moves.component';
import { TimerComponent } from './timer/timer.component';
import { TimerControlBarComponent } from './timer-control-bar/timer-control-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    NumbersYardComponent,
    MovesComponent,
    TimerComponent,
    TimerControlBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
