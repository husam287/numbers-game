import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumbersControllerService {

  // observable of numbers
  arrayOfNumbers = new Subject<number[][]>();
  
  // observable of the moves
  moved = new Subject<boolean>();

  // observable the win moment
  winNotify = new Subject<boolean>();

  theNumberArrayVar:number[][]; //array of numbers

  //copy of the win array
  winArray=[
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ];

  constructor() { }
  
  /**
   * it randoms the array
   */
  setTheArray() {
    let numberArray = [];

    // #### Randomizing ####
    numberArray.push(this.randomizeTheArray([1, 2, 3]));
    numberArray.push(this.randomizeTheArray([4, 5, 6]));
    numberArray.push(this.randomizeTheArray([7, 8, 9]));
    numberArray = this.randomizeTheArray(numberArray.slice());

    this.arrayOfNumbers.next(numberArray.slice()); //push the value to the array observable
    
    this.theNumberArrayVar=numberArray.slice(); //set the array variable
  }

  //for testing purposes
  makewin(){
    this.arrayOfNumbers.next(this.winArray);
    this.theNumberArrayVar=this.winArray;
  }

  /**
   * Checking if it's the win move
   */
  isWinner(){
    let win = this.arraysEqual(this.winArray,this.theNumberArrayVar);
    if(win) this.winNotify.next(true);
  }

  /**
   * Check the equality of two 2D Array
   * @param a first array
   * @param b second array
   * @returns if the two array are equal or not
   */
  private arraysEqual(a, b) {
    if (a === b) return true; //if normal numbers
    if (a == null || b == null) return false; //if one of them is null
    if (a.length !== b.length) return false; //colum lenght checking
  
    //Length Check of each row
    for (var i = 0; i < a.length; ++i) {
      if (a[i].length !== b[i].length) return false;
    }

    //Value Checking
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length; j++) {
        if(a[i][j]!==b[i][j]) return false;
      }  
    }

    return true; 
  }


  /**
   * 
   * @param arr copy of the current number array
   * @param i clicked element x-position
   * @param j clicked element y-position
   * @param swapDirection the direction of movement
   * @returns if it's a right move
   */
  swapElement(arr:number[][], i: number, j: number, swapDirection: string) {
    let swaped = false;

    //##### swap array element based on direction #####
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

    //##### Pushing the new array #####
    if(swaped){
      this.arrayOfNumbers.next(arr.slice());
      this.theNumberArrayVar=arr.slice();
    }

    //pushing the move state;
    this.moved.next(swaped);
    
    return swaped;
  }

  /**
   * Randomize an array elements
   * @param array array to be randomize
   * @returns array after randomize its elements
   */
  private randomizeTheArray(array) {
    let currentIndex = array.length, randomIndex:number;
    while (currentIndex !== 0) {
      //get a random index from 0 => currentIndex-1
      randomIndex = Math.floor(Math.random() * currentIndex);

      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex] , array[randomIndex]] = [array[randomIndex] , array[currentIndex]]
    }

    return array.slice();
  }
}
