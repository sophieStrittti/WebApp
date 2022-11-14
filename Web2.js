var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
const port =80;
var bodyParser = require('body-parser')
var sqlite3 = require('sqlite3').verbose();


var db = new sqlite3.Database('./database/texte.db');
db.run('CREATE TABLE IF NOT EXISTS einträge(text TEXT)');

app.listen(port, (err) => {
  if (err) {
      console.log('Error: ', err)
  } else {
      console.log('Server is up on port: ', port)
  }
});

app.use(express.static("/app/pages"));

app.use(bodyParser.text({
  extended: true
}));

app.post('/', function (req, res) {
  db.serialize(()=>{
    db.run('INSERT INTO einträge(text) VALUES(?)', req.body, function(err) {
      if (err) {
        return console.log(err.message);
      }
    });
  });
});

app.post('/test', function(req, res) { 
  db.serialize(()=>{
    db.all('SELECT text FROM einträge', [], function(err,rows) {
      if (err) {
        return console.log(err.message);
      }
      var strings = ''
      rows.forEach((row) => {
        strings = strings + '/n' + row.text;
      });
      console.log(strings);
      res.send(strings);
    });
  });
});

server.listen(process.env.PORT, process.env.IP);
