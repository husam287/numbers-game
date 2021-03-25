import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersControllerService } from '../services/numbers-controller.service';
import { TimerControllerService } from '../services/timer-controller.service';

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
  constructor(private controller:NumbersControllerService,private timerController:TimerControllerService) { }

  ngOnInit(): void {
    this.subs1=this.timerController.controller.subscribe(op=>{
      if(op==='restart') this.moves=0;
    })

    this.subs=this.controller.moved.subscribe(moved=>{
      if(moved) this.moves++;
      else {
        this.wrong=true;
        this.resetWrong();
      }
    })
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
    this.subs1.unsubscribe();
  }

  private resetWrong(){
    setTimeout(() => {
      this.wrong=false;
    }, 300);
  }

}
