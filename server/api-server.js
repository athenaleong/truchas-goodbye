const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const port = process.env.PORT || 5555;

/* 
#########################
MONGODB Configuration  
#########################
*/

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://chris:chris123@cluster0.2lusr.mongodb.net/truchas?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  const collection = client.db('test').collection('devices');
  client.close();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.listen(port);
console.log("Listening on port: " + port);