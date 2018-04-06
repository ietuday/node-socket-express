const express = require('express');
const app = express();

app.get('/ping', (request, response) => {
    response.send('pong');
});

app.listen(8080, 'localhost');


const express = require('express');
const greetMiddleware = require('./greet.js');
express()
 .use('/api/v1/', greetMiddleware({ greeting:'Hello world' }))
 .listen(8080);


const express = require('express');
const greetMiddleware = require('./greet.js');

class GreetingService {
    constructor(greeting = 'Hello') {
        this.greeting = greeting;
    }
    createGreeting(name) {
        return `${this.greeting}, ${name}!`;
    }
}

express()
    .use('/api/v1/service1', greetMiddleware({
        service: new GreetingService('Hello'),
    }))
    .use('/api/v1/service2', greetMiddleware({
        service: new GreetingService('Hi'),
    }))
    .listen(8080);

const express = require('express'); //Imports the express module
const app = express(); //Creates an instance of the express module

const PORT = 3000; //Randomly chosen port

app.set('view engine', 'jade'); //Sets jade as the View Engine / Template Engine
app.set('views', 'src/views'); //Sets the directory where all the views (.jade files) are stored.

//Creates a Root Route
app.get('/', function(req, res) {
    res.render('index'); //renders the index.jade file into html and returns as a response. The
    render
    function optionally takes the data to pass to the view.
});

//Starts the Express server with a callback
app.listen(PORT, function(err) {
            if (!err) {
                console.log('Server is running at port', PORT);
            } else {
                console.log(JSON.stringify(err));
            }

});

const express = require('express'); //Imports the express module
const app = express(); //Creates an instance of the express module
const PORT = 3000; //Randomly chosen port

app.set('view engine', 'jade'); //Sets jade as the View Engine / Template Engine
app.set('views', 'src/views'); //Sets the directory where all the views (.jade files) are stored.

// //Creates a Root Route
app.get('/', function(req, res) {
    res.render('index'); //renders the index.jade file into html and returns as a response. The
//     render
//     function optionally takes the data to pass to the view.
});

//Starts the Express server with a callback
app.listen(PORT, function(err) {
    if (!err) {
        console.log('Server is running at port', PORT);
    } else {
        console.log(JSON.stringify(err));
    }
});


// or
/* res.send(JSON.stringify({
 string_value: 'StackOverflow',
 number_value: 8476
 })) */
 //you can add a status code to the json response
 /* res.status(200).json(info) */

 app.listen(port, function() {
 console.log('Node.js listening on port ' + port)
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 //pass error to the next matching route.
 next(err);
});
// // handle error, print stacktrace
app.use(function(err, req, res, next) {
 res.status(err.status || 500);
  res.render('error', {
 message: err.message,
 error: err
 });
});


var express = require('express');
var app = express();
//GET /names/john
app.get('/names/:name', function(req, res, next) {
    if (req.params.name == 'john') {
        return res.send('Valid Name');
    } else {
        next(new Error('Not valid name')); //pass to error handler
    }
});
// //error handler
app.use(function(err, req, res, next) {
    console.log(err.stack); // e.g., Not valid name
    return res.status(500).send('Internal Server Occurred');
});
app.listen(3000);


app.use(function(req, res, next) {
    function afterResponse() {
        res.removeListener('finish', afterResponse);
        res.removeListener('close', afterResponse);
        // actions after response
    }
    res.on('finish', afterResponse);
    res.on('close', afterResponse);
    // action before request
    // eventually calling `next()`
    next();
});
...
app.use(app.router);

