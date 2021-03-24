import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NumbersControllerService } from '../services/numbers-controller.service';

@Component({
  selector: 'app-numbers-yard',
  templateUrl: './numbers-yard.component.html',
  styleUrls: ['./numbers-yard.component.css']
})
export class NumbersYardComponent implements OnInit {

  numberArray = [];

  constructor( private controller:NumbersControllerService) {
    this.controller.arrayOfNumbers.subscribe(arr=>{
      this.numberArray=arr;
    })
  }
  
  ngOnInit(): void {
    this.controller.setTheArray();
  }


  

  

  

}
