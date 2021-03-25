import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersControllerService } from '../services/numbers-controller.service';
import { TimerControllerService } from '../services/timer-controller.service';

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

  subs:Subscription;
  constructor(private timerController:TimerControllerService,private controller:NumbersControllerService) { }

  ngOnInit(): void {

    this.subs=this.controller.winNotify.subscribe(isAWin=>{
      if(isAWin) {
        this.pause();
        this.win();
      }
      else{
        this.isWin=false;
      }
    })

  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  pause(){
    this.paused=!this.paused;
    if(this.paused) this.timerController.controller.next('pause');
    else this.timerController.controller.next('play');
  }

  win(){
    this.isWin=true;
  }

  restart(){
    if(!this.restarted){
      this.restarted=true;
      this.timerController.controller.next('restart');
      this.paused=false;
      this.controller.winNotify.next(false);
  
      
      setTimeout(() => {
        this.restarted=false;
      }, 3000);

    }
  }

}
