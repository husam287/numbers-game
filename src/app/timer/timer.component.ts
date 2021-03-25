import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersControllerService } from '../services/numbers-controller.service';
import { ScoreService } from '../services/score.service';
import { TimerControllerService } from '../services/timer-controller.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  minTens = 0;
  minOnes = 0;
  secondsTens = 0;
  secondsOnes = 0;

  intervalFunction;
  subs: Subscription;

  constructor(private timerController: TimerControllerService, private controller: NumbersControllerService, private scoreController: ScoreService) {

  }

  ngOnInit(): void {

    this.startTimer();

    this.controller.winNotify.subscribe(isWin => {
      if (isWin) this.scoreController.setTimer({ minTens: this.minTens, minOnes: this.minOnes, secondOnes: this.secondsOnes, secondTens: this.secondsTens })
    })

    this.subs = this.timerController.controller.subscribe(op => {
      switch (op) {
        case 'play':
          this.startTimer();
          break;

        case 'pause':
          this.stopTimer();
          break;

        case 'restart':
          this.restartTimer()
          break;
      }
    })


  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


  startTimer() {
    this.intervalFunction = setInterval(() => {
      if (this.secondsOnes + 1 === 10) {
        this.secondsOnes = 0;
        if (this.secondsTens + 1 === 6) {
          this.secondsTens = 0;
          if (this.minOnes + 1 === 10) {
            this.minOnes = 0;
            this.minTens++;
          } else {
            this.minOnes++;
          }
        } else {
          this.secondsTens++;
        }
      } else {
        this.secondsOnes++;
      }

    }, 1000)
  }


  stopTimer() {
    clearInterval(this.intervalFunction);
  }

  restartTimer() {
    this.stopTimer();
    this.secondsOnes = this.secondsTens = this.minOnes = this.minTens = 0;
    this.startTimer();
  }


}
