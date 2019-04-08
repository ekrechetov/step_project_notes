const checkConnection = require('../modules/check-connection.js');
const getNotes = require('../modules/get-notes.js');
const addNote = require('../modules/add-note.js');
const getNote = require('../modules/get-note.js');
const updateNote = require('../modules/update-note');
const deleteNote = require('../modules/delete-note');
// const addList = require('../app/modules/list/addList');

module.exports = (app) => {
  checkConnection(app);
  getNotes(app);
  addNote(app);
  getNote(app);
  updateNote(app);
  deleteNote(app);
	// addList(app, db);
}