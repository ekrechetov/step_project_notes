const checkConnection = require('../modules/check-connection.js');
const getNotes = require('../modules/get-notes.js');

const addNote = require('../modules/add-note.js');
const getNote = require('../modules/get-note.js');
const updateNote = require('../modules/update-note.js');
const deleteNote = require('../modules/delete-note.js');

const addList = require('../modules/add-list.js');
const getList = require('../modules/get-list.js');
const updateList = require('../modules/update-list.js');
const deleteList = require('../modules/delete-list.js');

module.exports = (app) => {
  checkConnection(app);
  getNotes(app);
  
  addNote(app);
  getNote(app);
  updateNote(app);
  deleteNote(app);
  
  addList(app);
  getList(app);
  updateList(app);
  deleteList(app);
}