const rp = require('request-promise');

// console.log('Starting Execution');
// const promise = rp('http://example.com/');
// promise.then(result => console.log(result));

// console.log("Can't know if promise has finished yet...");




// const success = Promise.resolve('Resolved');
// // Will print "Successful result: Resolved"
// success.
//     then(result => console.log(`Successful result: ${result}`)).
//     catch(e => console.log(`Failed with: ${e}`))


// const fail = Promise.reject('Err');
// // Will print "Failed with: Err"
// fail.
//     then(result => console.log(`Successful result: ${result}`)).
//     catch(e => console.log(`Failed with: ${e}`))




// const call1Promise = rp('http://example.com/');

// call1Promise.then(result1 => {
//     // Executes after the first request has finished
//     console.log(result1);

//     const call2Promise = rp('http://example.com/');
//     const call3Promise = rp('http://example.com/');

//     return Promise.all([call2Promise, call3Promise]);
// }).then(arr => {
//     // Executes after both promises have finished
//     console.log(arr[0]);
//     console.log(arr[1]);
// })


// function f() {
//     return Promise.resolve('TEST');
// }

// // asyncF is equivalent to f!
// async function asyncF() {
//     return 'TEST';
// }

// asyncF();


var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(3000);

var clients = {};

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {

  socket.on('add-user', function(data){
    clients[data.username] = {
      "socket": socket.id
    };
  });

  socket.on('private-message', function(data){
    console.log("Sending: " + data.content + " to " + data.username);
    if (clients[data.username]){
      io.sockets.connected[clients[data.username].socket].emit("add-message", data);
    } else {
      console.log("User does not exist: " + data.username); 
    }
  });

  //Removing the socket on disconnect
  socket.on('disconnect', function() {
  	for(var name in clients) {
  		if(clients[name].socket === socket.id) {
  			delete clients[name];
  			break;
  		}
  	}	
  })

});