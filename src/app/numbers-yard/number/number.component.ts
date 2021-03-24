import { Component, Input, OnInit } from '@angular/core';
import { NumbersControllerService } from 'src/app/services/numbers-controller.service';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {
  
  clicked=false;
  clickedPosition={x:0,y:0};
  x:number=0;
  y:number=0;

  maxLimit=30;
  
  colorMap = {1:'primary',2:'secondary',3:'success',4:'danger',5:'dark',6:'warning',7:'info',8:'success'}

  @Input('number') number:number=2;
  @Input('coordinates') coordinates:{'i':number,'j':number};
  @Input('numberArray') numberArray;

  successfullMove=null;
  
  
  constructor(private controller:NumbersControllerService) { }

  ngOnInit(): void {
    
  }

  clicking(){
    this.clicked=true;
  }


  moving(event){
    if(this.clicked){
      if(this.clickedPosition.x===0 ) this.clickedPosition.x = event.pageX || event.touches[0].pageX;
      if(this.clickedPosition.y===0) this.clickedPosition.y = event.pageY || event.touches[0].pageY;

      this.x = event.pageX || event.touches[0].pageX;
      this.y = event.pageY || event.touches[0].pageY;


      //reseting at max limit
      if(Math.abs(this.y-this.clickedPosition.y)>this.maxLimit || Math.abs(this.x-this.clickedPosition.x)>this.maxLimit ){
        this.releazing();
      }


    }
  
  }




  private releazing(){

    this.clicked=false;
    let left_offset = this.x-this.clickedPosition.x;
    let top_offset = this.y-this.clickedPosition.y;

    let direction='up';

    
    if(top_offset>0 && Math.abs(top_offset)>Math.abs(left_offset)) direction='down';
    else if(top_offset<=0 && Math.abs(top_offset)>Math.abs(left_offset) ) direction='up';
    else if(left_offset<=0 && Math.abs(left_offset) > Math.abs(top_offset)) direction='left';
    else if(left_offset>0 && Math.abs(left_offset) > Math.abs(top_offset) ) direction='right';


    this.x=this.y=this.clickedPosition.x=this.clickedPosition.y=0;

    this.successfullMove = this.controller.swapElement(this.numberArray,this.coordinates.i,this.coordinates.j,direction);
    console.log(this.successfullMove)
    this.refreshSuccessfulMove();
  }


  private refreshSuccessfulMove(){
    setTimeout(() => {
      this.successfullMove=null;
    }, 300);
  }

  test(){
    console.log('ssss')
  }

}