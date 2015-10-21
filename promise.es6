let promise = new Promise((resolve, reject) => {
    resolve('HELLO WORLD!')
})

promise.then(console.log)

console.log("I'm first")
