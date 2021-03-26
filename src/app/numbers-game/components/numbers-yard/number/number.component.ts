import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NumbersControllerService } from '../../../services/number-controller/numbers-controller.service';
import { TimerControllerService } from '../../../services/timer-controller/timer-controller.service';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {
  
  clicked=false;
  clickedPosition={x:0,y:0};

  //position of movement
  x:number=0;
  y:number=0;

  //limit range to restrict block movement
  maxLimit=30;
  
  colorMap = {1:'primary',2:'secondary',3:'success',4:'danger',5:'dark',6:'warning',7:'info',8:'success'}

  @Input('number') number:number=2;
  @Input('coordinates') coordinates:{'i':number,'j':number};
  @Input('numberArray') numberArray;
  @Input('viewMode') viewMode=false;

  successfullMove=null;
  timeIsPaused=false;

  winState=false;

  subs1:Subscription;
  subs:Subscription;
  constructor(private controller:NumbersControllerService,private timerControl:TimerControllerService) { }

  ngOnInit(): void {
    //always checking for win
    this.subs1=this.controller.winNotify.subscribe(iswin=>{
      this.winState=iswin;
    })

    //always checking if it paused
    this.subs=this.timerControl.controller.subscribe(op=>{
      if(op==='pause') this.timeIsPaused=true;
      else this.timeIsPaused=false;
    })
  }

  /**
   * perform a click
   */
  clicking(){
    if(!this.viewMode) this.clicked=true;
  }


  /**
   * move the block and left it afte the limit range
   * @param event event of movement
   */
  moving(event){
    if(this.clicked && !this.winState){

      // set the click position once
      if(this.clickedPosition.x===0 ) this.clickedPosition.x = event.pageX || event.touches[0].pageX;
      if(this.clickedPosition.y===0) this.clickedPosition.y = event.pageY || event.touches[0].pageY;

      //always setting the movment position
      this.x = event.pageX || event.touches[0].pageX;
      this.y = event.pageY || event.touches[0].pageY;

      //reseting at max limit
      if(Math.abs(this.y-this.clickedPosition.y)>this.maxLimit || Math.abs(this.x-this.clickedPosition.x)>this.maxLimit ){
        this.releazing();
      }


    }
  
  }



  /**
   * releaze the block, calculate the direction of movement,
   * reset click postion
   * 
   */
  private releazing(){

    this.clicked=false;
    let direction='up';
    
    //initial the offset of the movement block
    let left_offset = this.x-this.clickedPosition.x;
    let top_offset = this.y-this.clickedPosition.y;
    
    // calculate the direction of movement
    if(top_offset>0 && Math.abs(top_offset)>Math.abs(left_offset)) direction='down';
    else if(top_offset<=0 && Math.abs(top_offset)>Math.abs(left_offset) ) direction='up';
    else if(left_offset<=0 && Math.abs(left_offset) > Math.abs(top_offset)) direction='left';
    else if(left_offset>0 && Math.abs(left_offset) > Math.abs(top_offset) ) direction='right';


    this.x=this.y=this.clickedPosition.x=this.clickedPosition.y=0; //reset positions


    //calculate status of the move
    if(this.timeIsPaused) this.successfullMove=false;
    else this.successfullMove = this.controller.swapElement(this.numberArray.slice(),this.coordinates.i,this.coordinates.j,direction);

    if(this.successfullMove) this.controller.isWinner(); //check if that win or not

    this.refreshSuccessfulMove(); //reset move status after a while
  }

  /**
   * 
   * @param time after this time the move status will be reset to null
   */
  private refreshSuccessfulMove(time:number=300){
    setTimeout(() => {
      this.successfullMove=null;
    }, time);
  }

}
