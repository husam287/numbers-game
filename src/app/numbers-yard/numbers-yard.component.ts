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

    
    
  }
  
  ngOnInit(): void {

    //init the scale property
    this.scaleString = `scale(${this.scale})`;

    //Detect any change in array of number
    this.subs1=this.controller.arrayOfNumbers.subscribe(arr=>{
      this.numberArray=arr.slice();
    })

    //initial the array of numbers
    this.controller.setTheArray();

    //if restarted => reinit the array
    this.subs=this.timerController.controller.subscribe(op=>{
      if(op==='restart')
        this.controller.setTheArray();
    })

  }
  trackByFn(index,item){
    return item.id;
  }

  ngOnDestroy(){
    this.subs1.unsubscribe();
    this.subs.unsubscribe();
  }


  
  test(){
    this.controller.makewin();
  }
  

  

}
