'use strict';

const noteDB = require('./notes-collection');

class Notes {
  constructor(input) {
    this.data = input;
  }

  async execute() {
    if (this.data.Text) {         // save if stated with -a/--add
      let objNote = await noteDB.save(this.data);
      console.log('Note saved: ', objNote.Text);
    };

    if (this.data.delete) {   // delete 1 note with --delete id
      let deletedNote = await noteDB.deleteOne(this.data.delete);
      console.log(`Deleted Note ${deletedNote}`);
    };

    if (this.data.methods[4]) { // delete bunch of notes by category or all if stated with --clear category or --clear
      let deletedNotes = await noteDB.deleteBunch(this.data.deleteFilter);
      console.log(`Deleted All Notes ${this.data.deleteFilter ? "in Category " + this.data.deleteFilter : ""}`, deletedNotes);
    };
    
    if (this.data.updateID) { // updates a note with -u/--update with the selected ID, along with passed text, category parameters to change
      let updatedNote = await noteDB.updateOne(this.data);
      console.log(updatedNote ? `Updated Note ${updatedNote}` : `Note with ID:${updatedNote._id} non existent`);
    };

    if (this.data.getNotes != true && this.data.methods[2]) {
      let objNote = await noteDB.get(this.data.getNotes); // get all notes or 1 note if stated with --get id
      console.log(`Note with ID:${this.data.methods[2]} is ${objNote}`);
    } else {
      let objArray = await noteDB.get(); 
      objArray.forEach(note => {
        console.log(` ${note.Text}`, '\n', 
        `Category: ${note.Category}     ID: ${note._id}`, '\n'
        , "--------------------------------------------------");
      });
    }
  }
  
  valid() {
    return this.data.methods && // checks if methods exists
    ((this.data.Text && typeof this.data.Text != "boolean") //checks if text exists
    || this.data.delete 
    || this.data.getNotes
    || this.data.deleteFilter)
    || this.data.methods[5]
    || this.data.help;
  }

  help() {
    let helpStr = 
      `\n       api usage: 'node notes.js -a/--add <note> -c/--category <category><optional> --get<ID><optional> 
      --delete <ID> --clear <category><optional> -u/--update "<ID>,<note>,<category>'
      --------------------------------------------------
      -a/--add adds the following note to the database along with an -c/--category for an optional category
      --get lists specified note or all saved notes if empty
      --delete deletes the note on the specified ID
      --clear deletes notes in the specified category or all notes if left empty
      -u/--update selects the note by id, and updates its fields using the following format "<ID>, <note>, <category>`;
    if (this.data.help) {
      console.log(helpStr)
    } else {
      console.log(`\nError bad input \n` + helpStr)
    }
  }
}

module.exports = Notes;
