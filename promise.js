'use strict';

var promise = new Promise(function (resolve, reject) {
  resolve('HELLO WORLD!');
});

promise.then(console.log);

console.log("I'm first");

// This will console.log("I'm first") and then console.log("HELLO WORLD!")

var arr = ['1', '2', '3', '4', '5', '6', '7'];

function promise() {
  return new Promise(function (resolve, reject) {
    resolve(arr.map(function (num, idx) {
      return num * 2;
    }));
  });
}

// This will return a new promise and then console.log([numbers * 2])

function addAll(array) {
  Promise.all(arr).then(function (values) {
    return values * 2;
  }).then(console.log);
}

addAll();

// This will return a promise that executes the functions above, ending in console.log([numbers * 2])
