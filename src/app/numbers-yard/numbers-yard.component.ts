import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersControllerService } from '../services/numbers-controller.service';
import { TimerControllerService } from '../services/timer-controller.service';

@Component({
  selector: 'app-numbers-yard',
  templateUrl: './numbers-yard.component.html',
  styleUrls: ['./numbers-yard.component.css']
})
export class NumbersYardComponent implements OnInit,OnDestroy {

  numberArray = [];
  @Input('scale') scale=1;

  scaleString='scale(1)';


  subs1:Subscription;
  subs:Subscription;

  constructor(private controller:NumbersControllerService,private timerController:TimerControllerService) {

    this.subs1=this.controller.arrayOfNumbers.subscribe(arr=>{
      this.numberArray=arr;
    })

    
  }
  
  ngOnInit(): void {
    this.controller.setTheArray();
    this.scaleString = `scale(${this.scale})`;

    this.subs=this.timerController.controller.subscribe(op=>{
      if(op==='restart')
        this.controller.setTheArray();
    })

  }

  ngOnDestroy(){
    this.subs1.unsubscribe();
    this.subs.unsubscribe();
  }


  
  test(){
    this.controller.makewin();
  }
  

  

}
