import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { TimerFormat } from '../../interfaces/timer-format';


@Injectable({
  providedIn: 'root'
})

export class ScoreService {

  private timerAtwin:number; //in seconds
  private numberOfMoves:number;

  //observable of the score
  private score = new Subject<number>();

  constructor() { }


  /**
   * set the timer
   * @param arg 
   */
  setTimer(arg:TimerFormat){
    this.timerAtwin=arg.secondOnes + arg.secondTens*10;
    this.timerAtwin+=arg.minOnes*60 + arg.minTens*10*60;
  }


  /**
   * Set the number of moves.
   * @param moves 
   */
  setMoves(moves){
    this.numberOfMoves=moves;
  }

  /**
   * calculate the score with the number of moves
   * and the timer value at moment of win
   */
  calculateScore(){
    let score=Math.floor( 100_000_000/(this.numberOfMoves*this.timerAtwin) );
    this.score.next(score);
  }

  /**
   * 
   * @returns An observer to observe the score.
   */
  getScore(){
    return this.score;
  }

  
}
