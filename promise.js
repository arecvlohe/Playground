"use strict";

var promise = new Promise(function (resolve, reject) {
    resolve('HELLO WORLD!');
});

promise.then(console.log);

console.log("I'm first");
