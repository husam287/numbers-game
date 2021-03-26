import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerFormat } from '../../interfaces/timer-format';
import { NumbersControllerService } from "../../services/number-controller/numbers-controller.service";
import { ScoreService } from '../../services/score-controller/score.service';
import { TimerControllerService } from '../../services/timer-controller/timer-controller.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  timerUi:TimerFormat={minOnes:0,minTens:0,secondOnes:0,secondTens:0};

  //interval function used store the function ref to then clear interval
  intervalFunction;

  subs1:Subscription;
  subs: Subscription;

  constructor(private timerController: TimerControllerService, private controller: NumbersControllerService, private scoreController: ScoreService) {

  }

  ngOnInit(): void {

    this.startTimer(); //reset timer

    // observe the win moment
    this.subs1=this.controller.winNotify.subscribe(isWin => {
      if (isWin) this.scoreController.setTimer(this.timerUi)
    })


    // observe the time-controller signals
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
    this.subs1.unsubscribe();
  }


  /**
   * start or resume the timer
   * @param speed indicates the speed of timer in ms [default 1000ms]
   */
  startTimer(speed:number=1000) {

    this.intervalFunction = setInterval(() => {
      if (this.timerUi.secondOnes + 1 === 10) {
        this.timerUi.secondOnes = 0;
        if (this.timerUi.secondTens + 1 === 6) {
          this.timerUi.secondTens = 0;
          if (this.timerUi.minOnes + 1 === 10) {
            this.timerUi.minOnes = 0;
            this.timerUi.minTens++;
          } else {
            this.timerUi.minOnes++;
          }
        } else {
          this.timerUi.secondTens++;
        }
      } else {
        this.timerUi.secondOnes++;
      }

    }, speed)
  }


  /**
   * delete the timer Ui
   */
  stopTimer() {
    clearInterval(this.intervalFunction);
  }

  /**
   * reseting the timer Ui
   */
  restartTimer() {
    this.stopTimer();
    this.timerUi.secondOnes = this.timerUi.secondTens = this.timerUi.minOnes = this.timerUi.minTens = 0;
    this.startTimer();
  }


}
