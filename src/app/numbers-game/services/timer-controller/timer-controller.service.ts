import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerControllerService {

  //controller of the timer
  controller = new Subject<string>(); // play , restart, pause

  constructor() { }

  /**
   * Sent a play request to the timer
   */
  play(){
    this.controller.next('play');
  }

  /**
   * Sent a stop request to the timer
   */
   stop(){
    this.controller.next('stop');
  }

  /**
   * Sent a restart request to the timer
   */
   restart(){
    this.controller.next('restart');
  }
}
