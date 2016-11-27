var express = require('express');
var router = express.Router();
var db = require('./queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/notes', db.getAllNotes);
router.get('/api/notes/:id', db.getSingleNote);
router.post('/api/notes', db.createNote);
router.put('/api/notes/:id', db.updateNote);
router.delete('/api/notes/:id', db.removeNote);

module.exports = router;
