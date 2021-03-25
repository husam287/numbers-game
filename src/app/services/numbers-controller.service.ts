import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumbersControllerService {

  // observe the numbers
  arrayOfNumbers = new Subject<number[][]>();
  
  // observe the successful moves
  moved = new Subject<boolean>();

  // observe the win moment
  winNotify = new Subject<boolean>();

  theNumberArrayVar:number[][]; //array of nnumbers

  constructor() { }



  setTheArray() {
    let numberArray = [];
    numberArray.push(this.randomizeTheArray([1, 2, 3]));
    numberArray.push(this.randomizeTheArray([4, 5, 6]));
    numberArray.push(this.randomizeTheArray([7, 8, 9]));

    numberArray = this.randomizeTheArray(numberArray.slice());
    this.arrayOfNumbers.next(numberArray.slice());
    
    this.theNumberArrayVar=numberArray.slice();
  }

  //for testing
  makewin(){
    let winArray=[
      [7,8,9],
      [4,5,6],
      [1,2,3]
    ];
    this.arrayOfNumbers.next(winArray);
    this.theNumberArrayVar=winArray;
  }

  isWinner(){
    let winArray=[
      [7,8,9],
      [4,5,6],
      [1,2,3]
    ];

    let win = this.arraysEqual(winArray,this.theNumberArrayVar);
    
    if(win) this.winNotify.next(true);

  }


  private arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i].length !== b[i].length) return false;
    }

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length; j++) {
        if(a[i][j]!==b[i][j]) return false;
      }  
    }
    return true;
    
  }


  swapElement(arr:number[][], i: number, j: number, swapDirection: string) {
    let swaped = false;
    switch (swapDirection) {
      case "up":
        if(i!==0 && arr[i-1][j]===9){

          [ arr[i][j] , arr[i-1][j] ] = [ arr[i-1][j] , arr[i][j] ]; //swaping to up
          swaped=true;
        } 
        break;

      case "down":
        if(i!==2 && arr[i+1][j]===9){

          [ arr[i][j] , arr[i+1][j] ] = [ arr[i+1][j] , arr[i][j] ]; //swaping to down
          swaped=true;
        }
        break;

      case "right":
        if(j!=2 && arr[i][j+1]===9){
          
          [ arr[i][j] , arr[i][j+1] ] = [ arr[i][j+1] , arr[i][j] ]; //swaping to right
          swaped=true;
        }
        break;

      case "left":
        if(j!=0 && arr[i][j-1]===9){

          [ arr[i][j] , arr[i][j-1] ] = [ arr[i][j-1] , arr[i][j] ]; //swaping to left
          swaped=true;
        }
      break;
    }


    this.arrayOfNumbers.next(arr.slice());
    this.theNumberArrayVar=arr.slice();

    this.moved.next(swaped);
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
    return array.slice();
  }
}
