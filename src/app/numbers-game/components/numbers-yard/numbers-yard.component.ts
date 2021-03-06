import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersControllerService } from '../../services/number-controller/numbers-controller.service';
import { TimerControllerService } from '../../services/timer-controller/timer-controller.service';

@Component({
  selector: 'app-numbers-yard',
  templateUrl: './numbers-yard.component.html',
  styleUrls: ['./numbers-yard.component.css']
})
export class NumbersYardComponent implements OnInit,OnDestroy {

  numberArray = [];

  winner=false; //check if winner or not

  //for customization
  @Input('scale') scale=1;
  @Input('viewMode') viewMode=false;
  scaleString='scale(1)';


  subs2:Subscription;
  subs1:Subscription;
  subs:Subscription;

  constructor(private controller:NumbersControllerService,private timerController:TimerControllerService) {}
  
  ngOnInit(): void {

    //init the scale property
    this.scaleString = `scale(${this.scale})`;

    //Detect any change in array of number
    this.subs1=this.controller.arrayOfNumbers.subscribe(arr=>{
      if(!this.viewMode) this.numberArray=arr.slice();
      else this.numberArray=this.controller.winArray.slice();
    })

    //initial the array of numbers
    this.controller.setTheArray();

    //if restarted => reinit the array
    this.subs=this.timerController.controller.subscribe(op=>{
      if(op==='restart'){
        this.controller.setTheArray();
        this.winner=false;
      }
    })


    // if win show the winner slogan
    this.subs2=this.controller.winNotify.subscribe(win=>{
      this.winner=win;
    });


  }

  ngOnDestroy(){
    this.subs2.unsubscribe();
    this.subs1.unsubscribe();
    this.subs.unsubscribe();
  }

  //function used by angular in ngFor.
  //to not recreate elements when the array changes
  trackByFn(index,item){
    return item.id;
  }

  
  /**
   * testing function make immediate win
   */
  makeMeWin(){
    this.controller.makewin();
  }
  

  

}
