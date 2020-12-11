const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const axios = require('axios');
const fetch = require('fetch');


const app = express();
const port = process.env.PORT || 5555;

//DB setup
const {MongoClient, Grid} = require('mongodb');
const urlParser = bodyParser.urlencoded({extended: true});

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.post('/uploadImage', urlParser, async function(req, res) {
  var uri = "mongodb+srv://chris:fF1kjLnOaC769euR@cluster0.2lusr.mongodb.net/<truchas>?retryWrites=true&w=majority";
  const client = await new MongoClient(uri, {useUnifiedTopology: true});
  var imgUrl = req.body.images;
  client.connect(async function(err) {
    var imageDb = await client.db("truchas").collection('images');
    try {
    var imgId = imgUrl.map(async function(element){
        console.log(element);
        let blob = await axios.get(element, {responseType:"blob"});
        console.log(blob);

    }) }
    catch (e) {
      console.log(e);
    }

    client.close();
  })
  res.send('done')
})


app.use('/test', express.static(path.join(__dirname, '..', 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port);
console.log("Listening on port : " + port);
console.log(__dirname);


