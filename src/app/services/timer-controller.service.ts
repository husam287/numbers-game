import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerControllerService {

  controller = new Subject<string>(); // play , restart, pause
  constructor() { }

  
}
