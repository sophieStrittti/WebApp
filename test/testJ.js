var sqlite3 = require('sqlite3').verbose();
//get the current time
var date = new Date().toString();
var testbestanden = false;
var db = new sqlite3.Database('../database/texte.db');
db.run('CREATE TABLE IF NOT EXISTS einträge(text TEXT)');

db.serialize(() => {
    db.run('INSERT INTO einträge(text) VALUES(?)', date, function (err) {
        if (err) {
            return console.log(err.message);
        }
    });
});

db.serialize(()=>{
    db.all('SELECT text FROM einträge', [], function(err,rows) {
      if (err) {
        return console.log(err.message);
      }

      rows.forEach((row) => {
        if(row.text == date){
            console.log('success');
            testbestanden = true;
        }
      });
      if(testbestanden == true){
          console.log('Test bestanden');
      }
        else{
            console.log('Test nicht bestanden');
      }
      return(testbestanden);
    });
  });