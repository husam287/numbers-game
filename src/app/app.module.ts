import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberComponent } from './numbers-game/components/numbers-yard/number/number.component';
import { NumbersYardComponent } from './numbers-game/components/numbers-yard/numbers-yard.component';
import { MovesComponent } from './numbers-game/components/moves/moves.component';
import { TimerComponent } from './numbers-game/components/timer/timer.component';
import { TimerControlBarComponent } from './numbers-game/components/timer-control-bar/timer-control-bar.component';
import { NumbersGameComponent } from './numbers-game/numbers-game.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    NumbersYardComponent,
    MovesComponent,
    TimerComponent,
    TimerControlBarComponent,
    NumbersGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
