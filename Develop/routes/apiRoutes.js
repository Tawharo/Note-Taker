const db = require("../db/db.json");
const fs = require("fs");



module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile(".db/db.json", (err, data) => {
      if (err) throw err;
      //console.log(data);
      let notesArr = JSON.parse(data);
      res.json(notesArr);
    });
  });

  app.post("/api/notes", function (req, res) {

    const newNoteID = Date.now();

    let newNote = 
      {
        id: newNoteID,
        title: req.body.title,
        text: req.body.text
      };

    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      //console.log(data);
      let notesArr = JSON.parse(data);
      notesArr.push(newNote);
 
    fs.writeFile("./db/db.json", JSON.stringify(notesArr), function (err) {
      if (err) throw err;
      console.log('Saved!');
      res.json(db);
    });

  });
});
  app.delete("/api/notes/:id", (req, res) => {
    //read the db.json file
    let idChosen = req.params.id;
   fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    //console.log(data);
    let notesArr = JSON.parse(data);
   let newNotesArr = notesArr.filter(note => note.id != idChosen);
   fs.writeFile("./db/db.json", JSON.stringify(newNotesArr), function (err) {
    if (err) throw err;
    console.log('Deleted!');
    res.send(db);
  });
  })

  })

};