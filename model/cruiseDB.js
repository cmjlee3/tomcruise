const { MongoClient } = require('mongodb');

module.experts = function cruiseDB(){
  //do you db stuff here
  const dbConnection = 'mongodb://localhost:27017/cruisemovies'

  return {
    searchMovies(req, res, next){
    MongoClient.connect(dbConnection, (err, db) => {
      if (err) return next(err);

      db.collection('movies')
      .find(res.filteredQueryParams)
      .sort({Year: -1, Title: 1})
      .toArray((arrayError, data) => {
        if (arrayError) return next(arrayError);

          res.filteredMovies = data;
        return next;
      });
    });
      return false;
    },
  };
};
