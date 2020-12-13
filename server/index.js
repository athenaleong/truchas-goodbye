const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const axios = require('axios');
const fetch = require('fetch');
const cors = require('cors');
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5555;

const corsOptions = {
  origin: "http://localhost:3000"
}

//DB setup
const {MongoClient, ObjectID} = require('mongodb');
const { timingSafeEqual } = require('crypto');
const { type } = require('os');
const urlParser = bodyParser.urlencoded({extended: true});
const jsonParser = bodyParser.json();
const qs = require('qs');
var tagCollection;
//TODO: cors set up
app.use(cors(corsOptions));


//Multer-gridfs Setup
const url = "mongodb+srv://chris:fF1kjLnOaC769euR@cluster0.2lusr.mongodb.net/truchas?retryWrites=true&w=majority";

const storage = new GridFsStorage({ url: url,
                                    file: (req, file) => {
                                      return {filename : "file_" + Date.now(),
                                              bucketName: 'image'
                                            };
                                    }
                                  });
const upload = multer({ storage });


MongoClient.connect(url)
.then(client => {
  console.log('connected to db');
  const db = client.db('truchas');
   tagCollection = db.collection('tag'); 
   userCollection = db.collection('user');  

   app.locals.collection = tagCollection;
  })


app.get('/ping', function (req, res) {
  return res.send('pong');
});

// Use Multer and GridFS to upload images into Db
app.post('/uploadImage', upload.any(), async function(req, res) {
  console.log('upload Image')
  try {
      var files = req.files;
      var id = files.map((file) => file.id);
      res.send({id: id});
  } 
  catch (error) {
    res.status(500).json({error: error.toString()});
  }
    

    //TODO: return success message 
    
});

app.post('/uploadPointer', jsonParser, async function(req, res) {
  try {
    let json = req.body;
    console.log(json)
    app.locals.collection.insertOne(json);
    res.send();
  }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error.toString()});
  }
})

app.post('/getGeoJSON', urlParser, async function(req, res){
  //TODO: function to convert query into MongoDB query
  // console.log(`tag collection : ${tagCollection.find({})}`)
  let query = req.body.query;
  let tags = tagCollection.find(query);
  let geoJSONTag = []
  await tags.forEach(tag => {
    if (tag.category == 'Point') {
      console.log(geoJSONTag);
       geoJSONTag.push({
        type: "Feature",
        properties: { cluster: false, id: tag._id}, 
        geometry: {
          type: tag.category,
          coordinates: [
            parseFloat(tag.lng),
            parseFloat(tag.lat)
          ]
      }})
    }
  })
  res.send(geoJSONTag);
} )

app.get('/getUser', async function (req, res) {
  let user = userCollection.find({});
  let userData = []
  await user.forEach(u => {
    userData.push({label: u.name, value: u._id});
  })
  res.send(userData);
});

app.get('/getTag', async function (req, res) {
  let id = req.query.id;
  tagCollection.findOne({"_id" : new ObjectID(id)}).then(tag => {
    res.send(tag);
  })
})

//same origin 
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port);
console.log("Listening on port : " + port);
console.log(__dirname);


