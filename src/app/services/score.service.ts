import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import {take} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private timerAtwin:number; //in seconds
  private numberOfMoves:number;
  private score = new Subject<number>();
  constructor() { }

  setTimer(arg:{'minOnes':number,'minTens':number,'secondOnes':number,'secondTens':number}){
    this.timerAtwin=arg.secondOnes + arg.secondTens*10;
    this.timerAtwin+=arg.minOnes*60 + arg.minTens*10*60;
  }

  setMoves(moves){
    this.numberOfMoves=moves;
  }

  calculateScore(){
    console.log(this.timerAtwin,this.numberOfMoves)
    let score=Math.floor( 100_000_000/(this.numberOfMoves*this.timerAtwin) );
    this.score.next(score);
  }

  getScore(){
    return this.score;
  }

  
}
