import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersControllerService } from '../../services/number-controller/numbers-controller.service';
import { ScoreService } from '../../services/score-controller/score.service';
import { TimerControllerService } from '../../services/timer-controller/timer-controller.service';


@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent implements OnInit,OnDestroy {

  moves=0;
  wrong=false;

  subs:Subscription;
  subs1:Subscription;
  
  constructor(private controller:NumbersControllerService,private timerController:TimerControllerService,private scoreController:ScoreService) { }

  ngOnInit(): void {

    //observe when the game get reset
    this.subs1=this.timerController.controller.subscribe(op=>{
      if(op==='restart') this.moves=0;
    })

    //observe when a block moved
    this.subs=this.controller.moved.subscribe(moved=>{
      if(moved) this.moves++;
      else {
        this.wrong=true;
        this.resetWrong();
      }
    })

    //observe the win state
    this.controller.winNotify.subscribe(isWin=>{
      if(isWin){
        this.scoreController.setMoves(this.moves);
      }
    })
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
    this.subs1.unsubscribe();
  }

  /**
   * reset wrong attribute to false after 300 second
   */
  private resetWrong(){
    setTimeout(() => {
      this.wrong=false;
    }, 300);
  }

}
