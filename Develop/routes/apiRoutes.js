const db = require("../db/db.json");
const fs = require("fs");

//npm package for an id to generate id for each note

const uuid = require("uuid/v4");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(db);
  });

  app.post("/api/notes", function (req, res) {

    //call the uuid package to generate a new unique random id and assign to a variable

    const newNoteID = uuid();
    // let notesArray = [];
    //set a variable object for the new note body with id, title, and note context
    console.log(req.body);
    let newNote = 
      {
        id: newNoteID,
        title: req.body.title,
        text: req.body.text
      };

    //read the db.json file and store the data you get back into a variable for all notes we get back
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      console.log(data);
      var notesArr = JSON.parse(data);
      notesArr.push(newNote)
 
    
    //push the new note into the array we store all notes in
    
    //write new content into db.json file with the all notes array after we pushed the new note in.
    fs.writeFile("./db/db.json", JSON.stringify(notesArr), function (err) {
      if (err) throw err;
      console.log('Saved!');
      res.send(db);
    });
    //send the data to end the post process
  });
});
  app.delete("/api/notes/:id", (req, res) => {
    //read the db.json file
    var idChosen = req.params.id;
   fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    console.log(data);
    var notesArr = JSON.parse(data);
   var newNotesArr = notesArr.filter(note => note.id != idChosen);
   fs.writeFile("./db/db.json", JSON.stringify(newNotesArr), function (err) {
    if (err) throw err;
    console.log('Saved!');
    res.send(db);
  });
  })
    //filter through the data for all notes and assign to a variable
    //where the id of the note we want to delete doesn't match the id of any notes in db.json
    //so it would only return the notes we want to keep/display

    //write the new variable we just created to db.json file
    //send the data to end the delete process
  })

}