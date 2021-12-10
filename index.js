var express = require("express");
var app = express();
var http = require('http').Server(express);

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./room.db', sqlite3.OPEN_READWRITE, (err)=>{
  if (err) {
    console.error(err.message);
  }
  console.log('Database Connection Established')
});
db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS RoomData (temperature INT, humidity INT, TimeStamp TEXT)');
});

app.use(express.json());

app.get("/", (req, res, next) => {
  res.json(["Hello"]);
 });

app.post('/api/post', (req, res) => {
  console.log(req.body);
  let x = req.body;
  let record = new BoardData(x.temperature, x.humidity, x.timeStamp)
  db.serialize(function() {
    let statement = db.prepare('INSERT INTO RoomData VALUES(?,?,?)');
    statement.run(record.temperature, record.humidity, record.timeStamp)
    statement.finalize();
  });
});


class BoardData {
  constructor(temperature, humidity, timeStamp){
    this.temperature = temperature;
    this.humidity = humidity;
    this.timeStamp = timeStamp;
  }
}


// app.listen(3000,'0.0.0.0', () => {
//   console.log("Server running on port 3000");
//  });

http.listen(80, '192.168.70.153', function() {
  console.log('Lan Server at port 3000')
})