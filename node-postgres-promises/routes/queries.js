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
  var noteID = parseInt(req.params.id);
  console.log(noteID);
  db.one('select * from notes where id = $1', noteID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE note'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function createNote(req, res, next) {
  db.one('insert into notes(description)' + 'values(${description}) returning *',req.body)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Inserted one note'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function updateNote(req, res, next) {
  db.none('update notes set description=$1 where id=2',
    [req.body.description, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated note'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function removeNote(req, res, next) {
  var noteID = parseInt(req.params.id);
  db.result('delete from notes where id = $1', noteID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} note`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
