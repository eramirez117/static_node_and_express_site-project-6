 //use require method to require the express module
const express = require('express');


/*to create an express application,
 we can just call express method, 
 the express function returns an express application,  we assign the the express
 app to a new var called app*/
const app = express();


//require body parser, Both body parser and cookie parser are middleware
const bodyParser = require('body-parser');

//require cookie-Parser
const cookieParser = require('cookie-parser');


//use bodyParser in app to read POST  data
 app.use(bodyParser.urlencoded({extended: false}));
 
  //use cookie parser in app to store input and get the server to remember the data stored
 app.use(cookieParser());

 //add express.static to serve static assets
  app.use('/static', express.static('public'));
  
  
/*we tell express to use pug by using the set() method to set view engine
to parameter pug*/
app.set('view engine', 'pug');

//import routes from index.js
const appRoutes = require('./routes/index.js');

//use routes variable in a middleware function to pass in the routes
app.use(appRoutes); 
console.log('app.js has received the routes');

//I watched joel's middleware video as a reference for the error handler
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
   next(err);
  });
  
  // error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  
  // production error handler
  // no stack traces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  


/*setup the development server using the listen method
and give parameter of 3000 which is the port number*/

app.listen(3000, () => { //the listen method can take a callback function as a parameter
    console.log('App.listen works, The application is running on localhost:3000!');
});
