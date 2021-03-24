import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumbersControllerService {


  arrayOfNumbers = new Subject<number[][]>();
  constructor() { }



  setTheArray() {
    let numberArray = [];
    numberArray.push(this.randomizeTheArray([1, 2, 3]));
    numberArray.push(this.randomizeTheArray([4, 5, 6]));
    numberArray.push(this.randomizeTheArray([7, 8, null]));

    numberArray = this.randomizeTheArray(numberArray);
    this.arrayOfNumbers.next(numberArray);
  }

  swapElement(arr:number[][], i: number, j: number, swapDirection: string) {
    let swaped = false;
    switch (swapDirection) {
      case "up":
        if(i!==0 && !arr[i-1][j]){

          [ arr[i][j] , arr[i-1][j] ] = [ arr[i-1][j] , arr[i][j] ]; //swaping to up
          swaped=true;
        } 
        break;

      case "down":
        if(i!==2 && !arr[i+1][j]){

          [ arr[i][j] , arr[i+1][j] ] = [ arr[i+1][j] , arr[i][j] ]; //swaping to down
          swaped=true;
        }
        break;

      case "right":
        if(j!=2 && !arr[i][j+1]){
          
          [ arr[i][j] , arr[i][j+1] ] = [ arr[i][j+1] , arr[i][j] ]; //swaping to right
          swaped=true;
        }
        break;

      case "left":
        if(j!=0 && !arr[i][j-1]){

          [ arr[i][j] , arr[i][j-1] ] = [ arr[i][j-1] , arr[i][j] ]; //swaping to left
          swaped=true;
        }
      break;
    }

    this.arrayOfNumbers.next(arr);
    return swaped;
  }






  private randomizeTheArray(array) {
    let currentIndex = array.length, randomIndex, temp;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);

      currentIndex--;
      // And swap it with the current element.
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }
}
