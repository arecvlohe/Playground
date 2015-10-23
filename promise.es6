/*
let promise = new Promise((resolve, reject) => {
    resolve('HELLO WORLD!');
});

promise.then(console.log);

console.log("I'm first");
*/

let arr = ['1','2','3','4','5','6','7'];

function promise() {
  return new Promise((resolve, reject) => {
    resolve(
      arr.map((num, idx) => {
        return num * 2;
      })
    );
  });
}


// promise().then(console.log);

function addAll(array) {
  Promise.all(arr)
    .then(values => values * 2)
    .then(console.log);
}

addAll();
