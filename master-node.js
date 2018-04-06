var request = require('request');
// Example 1
var EventEmitter = require('events').EventEmitter;

var Counter = function(init) {
    this.increment = function() {
        init++;
        this.emit('incremented', init);
    }
}

Counter.prototype = new EventEmitter();

var counter = new Counter(10);

var callback = function(count) {
    console.log(count);
}

counter.addListener('incremented', callback);
counter.increment();
counter.increment();

// Example2
var Readable = require('stream').Readable;
var readable = new Readable;
var count = 0;

readable._read = function() {
    if (++count > 10) {
        return readable.push(null);
    }
    setTimeout(function() {
        readable.push(count + "\n");
    }, 500);
};
readable.pipe(process.stdout);

// Example3
var count = 0;
(function curse() {
 console.log(++count);
 curse();
})()


// Example4
"use strict"
let owners = new WeakMap();
let task = {
 title : "Big Project"
};
owners.set(task, 'John');
function owner(task) {
 if(owners.has(task)) {
 return console.log(owners.get(task));
 }
 console.log("No owner for this task.");
}
owner(task); // "John"
owner({}); // "No owner for this task"

// Example 5

var size = process.argv[2];
var totl = process.argv[3] || 100;
var buff = [];

for (var i = 0; i < totl; i++) {
    buff.push(new Buffer(size));
    process.stdout.write(process.memoryUsage().heapTotal + "\n");
}

// Example 6
    setTimeout(function() {
        console.log("Waiting");
    }, 5000);
process.on('SIGINT', function() {
 console.log('SIGINT signal received');
 process.exit(1);
})

// Sync

function slowSquare(n){
 var i = 0;  
 while (++i < n * n) {}
}
slowSquare(100000)
slowSquare(100000)

// Async
function slowSquareAsync(){
 setTimeout(function(args) {
  let i = 0;  
  let n = 100000
  while (++i < n * n) {} 
 }, 1) 
}
slowSquareAsync()
slowSquareAsync()

var arr = [];

    for (var i = 0; i < 3; i++) {
        arr.push(
            (function(j) {
                return function() {
                    console.log(j);   
                }
            }(i))
        )

}


var arr = [];

    for (var i = 0; i < 3; i++) {
        arr.push(
            (function(j) {
                return function() {
                    console.log(j);   
                }
            }(i)())
        )

    }

// Async & Await


(function handler (req, res) {
  return request('https://user-handler-service')
    .catch((err) => {
      logger.error('Http error', err)
      error.logged = true
      throw err
    })
    .then((response) => Mongo.findOne({ user: response.body.user }))
    .catch((err) => {
      !error.logged && logger.error('Mongo error', err)
      error.logged = true
      throw err
    })
    .then((document) => executeLogic(req, res, document))
    .catch((err) => {
      !error.logged && console.error(err)
      res.status(500).send()
    })
})();

const axios = require('axios'); // promised based requests - like fetch()

function getCoffee() {
  return new Promise(resolve => {
    setTimeout(() => resolve('☕'), 2000); // it takes 2 seconds to make coffee
  });
}

async function go() {
  try {
    // but first, coffee
    const coffee = await getCoffee();
    console.log(coffee); // ☕
    // then we grab some data over an Ajax request
    const wes = await axios('https://api.github.com/users/wesbos');
    console.log(wes.data); // mediocre code
    // many requests should be concurrent - don't slow things down!
    // fire off three requests and save their promises
    const wordPromise = axios('http://www.setgetgo.com/randomword/get.php');
    const userPromise = axios('https://randomuser.me/api/');
    const namePromise = axios('https://uinames.com/api/');
    // await all three promises to come back and destructure the result into their own variables
    const [word, user, name] = await Promise.all([wordPromise, userPromise, namePromise]);
    console.log(word.data, user.data, name.data); // cool, {...}, {....}
  } catch (e) {
    console.error(e); // 💩
  }
}

go();