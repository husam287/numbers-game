import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersControllerService } from '../services/numbers-controller.service';

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

  constructor( private controller:NumbersControllerService) {
    this.subs1=this.controller.arrayOfNumbers.subscribe(arr=>{
      this.numberArray=arr;
    })

    
  }
  
  ngOnInit(): void {
    this.controller.setTheArray();
    this.scaleString = `scale(${this.scale})`;
  }

  ngOnDestroy(){
    this.subs1.unsubscribe();
  }


  

  

  

}
