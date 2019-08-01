'use strict';

const LinkedList = require('./LinkedList');

// #1

// [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40]

// [21, 1, 26, 45, 29, 28, 2, 9] [16, 49, 39, 27, 43, 34, 46, 40]

// [21, 1, 26, 45] [29, 28, 2, 9] // [16, 49, 39, 27] [43, 34, 46, 40]

// [21, 1] [26, 45] [29, 28] [2, 9] [16, 49] [39, 27] [43, 34] [46, 40]

// [21] [1] [26] [45] [29] [28] [2] [9] [16] [49] [39] [27] [43] [34] [46] [40]

// #1a [21, 1]
// #1b [16, 49, 39, 27, 43, 34, 46, 40]
// #1c [21] and [1]
// #d [1, 21, 26, 45] and [2, 9, 28, 29]

// #2

// Argument after first step:  [3 9 1 14 17 24 22 20]

// #2a: The pivot could have been either 14 or 17
//      • All items to the left of either 14 or 17 are less than them. So either could have been the pivot

//   List we're working with:
//   [14, 17, 13, 15, 19, 10, 3, 16, 9, 12]
//
// #2b:
//   1: 10, 3, 13, 15, 19, 14, 17, 16, 9, 12
//
//   2: 13, 10, 14, 15, 19, 17, 3, 16, 9, 12

// #3
function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}
const pivotArray = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7,46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];
function qSort(array, start=0, end = array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = qSort(array, start, middle);
  array = qSort(array, middle + 1, end);
  return array;
}
function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (var i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  return j;
}

// console.log(qSort(pivotArray));

// #4
function mSort(array) {
  if (array.length <= 1) {
    return array;
  }

  // if (!ll || ll.next === null) {
  //   return ll
  // }

  const middle = Math.floor(array.length / 2);
  // LinkdedList middle = findMiddle(ll);
  // const leftLast = ll.findprevious(middle);
  // leftLast.next = null;
  let left = array.slice(0, middle);
  // ll.head - leftLast
  let right = array.slice(middle, array.length);
  // middle - ll.findLast()

  left = mSort(left);
  right = mSort(right);
  return merge(left, right, array);
  // merge(ll.head, ll.middle)

  // if ll.head.value < ll.middle {
  //   ll.head.next = middle
  // } else {
  //   middle.next = ll.head;
  // }
}

// [3, 6, 2, 5]
// [3, 6] //[2, 5]
// [3] [6]

// 3 => 6 => 2 => 5
// 3 => 6          2 => 5
// 3 => null      6 => null
// 3 => 6        2 => 5

function merge(left, right, array) {
  let leftIndex = 0;
  // node1 = left.head
  // left.head = null
  let rightIndex = 0;
  // node2 = right.head
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    // while (node1 && node2)
    if (left[leftIndex] < right[rightIndex]) {
      // if node1.value < node2.value
      array[outputIndex] = left[leftIndex];
      // if (left.head === null) {
      //   left.head = node1;
      // } else {
      //   left.next = node1;
      // }
      // node1 = node1.next
      outputIndex++;
      leftIndex++;
    } else {
      array[outputIndex] = right[rightIndex];
      // if (left.head === null) {
      //   left.head = node2;
      // } else {
      //   left.next = node2;
      // } node2 = node2.next
      outputIndex++;
      rightIndex++;
    }
  }
  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex] = left[i];
    outputIndex++;
  }
  for (let i = rightIndex; i < right.length; i++) {
    // while (node2) {
    //   left.next = node2
    //   node2 = node.next
    // }
    array[outputIndex] = right[i];
    outputIndex++;
  }
  return array;
}

// console.log(mSort(pivotArray));

// #5
const sll = new LinkedList();

for (let i = 0; i< pivotArray.length; i++) {
  sll.insertLast(pivotArray[i]);
}

// console.log(sll);
// sll.mergeSort();

console.log('MERGE SORT');
// console.log(sll);
// console.log(sll.mergeSort());