import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersControllerService } from '../services/numbers-controller.service';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent implements OnInit,OnDestroy {

  moves=0;
  wrong=false;

  subs:Subscription;
  constructor(private controller:NumbersControllerService) { }

  ngOnInit(): void {
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
  }

  private resetWrong(){
    setTimeout(() => {
      this.wrong=false;
    }, 300);
  }

}
