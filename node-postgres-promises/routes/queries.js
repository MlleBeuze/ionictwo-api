var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://melissabeuze:melroot@localhost:5432/notes';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllNotes: getAllNotes,
  getSingleNote: getSingleNote,
  createNote: createNote,
  updateNote: updateNote,
  removeNote: removeNote
};

/*
We utilized the any Query Result Mask to query the database, which returns a
promise object. This method is used to indicate that we are expecting any number
 of results back. Success and failures are then handled by .then() and .catch().
*/
function getAllNotes(req, res, next) {
  db.any('select * from notes')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL notes'
        });
    })
    .catch(function (err) {
      console.log("err: "+err);
      return next(err);
    });
}

function getSingleNote(req, res, next) {

}
function createNote(req, res, next) {

}
function updateNote(req, res, next) {

}
function removeNote(req, res, next) {

}
