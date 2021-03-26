import { Component,OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersControllerService } from '../../services/number-controller/numbers-controller.service';
import { ScoreService } from '../../services/score-controller/score.service';
import { TimerControllerService } from '../../services/timer-controller/timer-controller.service';

@Component({
  selector: 'app-timer-control-bar',
  templateUrl: './timer-control-bar.component.html',
  styleUrls: ['./timer-control-bar.component.css']
})
export class TimerControlBarComponent implements OnInit,OnDestroy {

  restarted=false;
  paused=false;
  score=0;
  isWin=false;

  subs1:Subscription;
  subs:Subscription;
  
  constructor(private timerController:TimerControllerService,private controller:NumbersControllerService,private scoreController:ScoreService) { }

  ngOnInit(): void {
    // observe the score which get calculated at win moment
    this.subs1=this.scoreController.getScore().subscribe(winScore=>{
      this.score=winScore;
    })

    // observe the win state
    this.subs=this.controller.winNotify.subscribe(isAWin=>{
      if(isAWin) {
        this.pause();
        this.win();
        this.scoreController.calculateScore(); 
      }
      else{
        this.isWin=false;
      }
    })
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
    this.subs1.unsubscribe();
  }

  /**
   * pause and play the timer
   */
  pause(){
    this.paused=!this.paused;
    if(this.paused) this.timerController.controller.next('pause');
    else this.timerController.controller.next('play');
  }

  /**
   * make a win
   */
  win(){
    this.isWin=true;
  }

  /**
   * restart the whole game
   */
  restart(){
    if(!this.restarted){

      this.restarted=true;
      //sent to the controller a restart request
      this.timerController.controller.next('restart');

      this.paused=false; //automatic resume the game

      //push a false when restarted to play again
      this.controller.winNotify.next(false);
  
      setTimeout(() => {
        this.restarted=false;
      }, 3000);

    }
  }

}
