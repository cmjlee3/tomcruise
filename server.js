/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint key-spacing: ["error", { align: "value" }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const express = require('express');
const logger = require('morgan');
const cruiseDB = require('./model/cruiseDB');
// const path = require('path');

const app = express();
const dbService = cruiseDB();
const port = process.argv[2] || process.env.PORT || 3000;


//set up logging so we can see what's happening
app.use(logger('dev'));

//set up ejs to render the views
// app.set('view engine', 'ejs');
// app.set('view', 'view');

app.use((err, req, res, next) => {
  res.send(402);
  res.json('error', {
    message: err.message,
    error: {},
  });
});

const filterQS = (req, res, next) => {
//   //read in params
//   //only choose those that match (y,t,d,id)
//   //validate
//   //build an object literal that contains my filter terms
//   //return that new obj
//   return value = [y, t, d, id];

// }
//solutions:
//1. For/in loop over the r // for/of
//2. Object.keys() to turn the object into an arry
//3. .filter the above
//4. If('y' in r) {// then add it to the obj}
//ONE OPTION:
// const filterObj = {};

// if ('id' in qs) filterObj.imdbID = qs.id;
// if ('y' in qs) filterObj.Year = qs.y;

// for(let key in qs){
//   switch(key) {
//     case 'id':
//     filterObj.imdbID = qs.id;
//   }
// }
//OPTION TWO: we destructure the query object...
  const filterObj ={};
  const qs =req.query;

  if ('id' in qs) filterObj.imdbID = qs.id;
  if ('y' in qs) filterObj.Year = qs.y;
  if ('t' in qs) filterObj.Title = qs.t;
  if ('d' in qs) filterObj.Director = qs.d;

//to do validate data
// if(!Number.parseInt(y)) {
//   delete y;
// }
//and then we restructure the values into a new object
  res.filteredQueryParams = filterObj;
  return next();
};

//OR you can use es6 destructuring assignments

app.get('/', filterQS, dbService.searchMovies, (req, res) => {
  res.json(res.filteredMovies);
});


//diff between log and warning is warn should come out yellow
app.listen(port, () => console.warn('The server is loaded', port));
