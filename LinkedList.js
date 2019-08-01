'use strict';

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, insertPt){
    if(this.head === null){
      this.insertFirst(item); //How do we want to handle these cases?
    } else {
      let tempNode = this.head;
      while (tempNode.next.value !== insertPt && tempNode.next !== null){ //tempNode -> newNode -> insertPt
        tempNode = tempNode.next;
      }
      let newNode = new _Node(item, tempNode.next);
      tempNode.next = newNode;
    }
  }

  insertAfter(item, insertPt){
    if(this.head === null){
      this.insertFirst(item);
    }
    else{
      let tempNode = this.head;
      while(tempNode.value !== insertPt && tempNode.next !== null){
        tempNode = tempNode.next;
      }
      let newNode = new _Node(item, tempNode.next);
      tempNode.next = newNode;
    }
  }

  insertAt(item, position) {
    if(this.head === null){
      this.insertFirst(item);
    }
    let counter = 1;
    let tempNode = this.head;
    while (counter !== position) {
      tempNode = tempNode.next;
      counter+= 1;
    }
    this.insertBefore(item, tempNode.value);
  }

  find(item){
    let currNode = this.head;

    if(!this.head){
      return null;
    }

    while(currNode.value !== item){
      if(currNode.next === null){
        return null;
      }
      else{
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  remove(item){
    if(!this.head){
      return null;
    }
    //Deleting first item
    if(this.head.value === item){
      this.head = this.head.next;
    }

    let currNode = this.head; //Why do we need to do this?
    let previousNode = this.head;

    while((currNode !== null) && (currNode.value !== item)){
      previousNode = currNode;
      currNode = currNode.next;
    }
    if(currNode === null){
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }

  mergeSort() {
    if (!this.head.next) {
      console.log('test2');
      return this;
    }

    let middle = findMiddleOfList(this);
    console.log(middle);
    let leftLast = findPrevious(middle);
    leftLast.next = null;
    let left = this.mergeSort();
    let right = middle.mergeSort();
    return this._merge(left, right);
  }

  _merge(left, right) {
    let node1 = left.head;
    left.head = null;
    let node2 = right.head;
    while (node1 && node2) {
      if (node1.value < node2.value) {
        if (!left.head) {
          left.head = node1;
        } else {
          left.next = node1;
        }
        node1 = node1.next;
      } else {
        if (!left.head) {
          left.head = node2;
        } else {
          left.next = node2;
        }
      }
    }
    while (node1) {
      left.next = node1;
      node1 = node1.next;
    }
    while (node2) {
      left.next = node2;
      node2 = node2.next;
    }
    return left;
  }
}

function findPrevious(ll, item){
  let currentNode = ll.head;
  while(currentNode !== null){
    if(currentNode.next !== null && currentNode.next.value === item){
      return currentNode;
    }
    currentNode = currentNode.next;
  }
  console.log('Item not found');
  return null;
}

function findLast(ll){
  let currentNode = ll.head;

  while(currentNode.next !== null){
    currentNode = currentNode.next;
  }

  return currentNode;
}

function findMiddleOfList(ll) {
  console.log('test findMiddle');
  if (ll.head === null) {
    return null;
  }
  let a = ll.head;
  let b;
  if (size(ll) % 2 === 0) {
    if (b === null) {
      console.log('B IS NULL');
      return;
    }
    b = findPrevious(ll, findLast(ll).value);
  } else {
    if (b === null) {
      console.log('B IS NULL');
      return;
    }
    b = findLast(ll);
  }
  console.log('b');
  console.log(b);
  while (a !== b) {
    a = a.next;
    b = findPrevious(ll, b.value);
  }
  return a;
}

function display(ll){
  let result = [];
  let currentNode = ll.head;
  while(currentNode !== null){
    result.push(currentNode.value);
    currentNode = currentNode.next;
  }
  return result;
}

function size(ll){
  return display(ll).length;
}

module.exports = LinkedList;