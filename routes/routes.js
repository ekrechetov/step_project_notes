const checkConnection = require('../modules/check-connection.js');
const getNotes = require('../modules/get-notes.js');
const addNote = require('../modules/add-note.js');
const getNote = require('../modules/get-note.js');
const updateNote = require('../modules/update-note');
const deleteNote = require('../modules/delete-note');

const addList = require('../modules/add-list');
const getList = require('../modules/get-list.js');
const getLists = require('../modules/get-lists.js');
const updateList = require('../modules/update-list');
const deleteList = require('../modules/delete-list');


module.exports = (app) => {
  checkConnection(app);
  getNotes(app);
  addNote(app);
  getNote(app);
  updateNote(app);
  deleteNote(app);

  addList(app);
  getList(app);
  getLists(app);
  updateList(app);
  deleteList(app);
}