const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");
const fetch = require("fetch");
const cors = require("cors");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
// const session = require('express-session');

//For caching and file persistance. NOTEL: add in .gitignore 
// const sessionFileStore = require('session-file-store');
// const persist = require('node-persist');

// Set up OAuth 2.0 authentication through the passport.js library.
// const passport = require('passport');
// const auth = require('./auth');
// auth(passport);

const app = express();
const port = 5555;
const config = require('./config'); 

const corsOptions = {
  origin: "http://localhost:3000",
};

//DB setup
const {MongoClient, ObjectID} = require('mongodb');
const { timingSafeEqual } = require('crypto');
const { type } = require('os');
const urlParser = bodyParser.urlencoded({extended: true});
const jsonParser = bodyParser.json();
const qs = require("qs");
var tagCollection;
var userCollection;
//TODO: cors set up
app.use(cors(corsOptions));

//Multer-gridfs Setup
const url =
  "mongodb+srv://chris:SGbxGijIACwFWoxD@cluster0.2lusr.mongodb.net/truchas?retryWrites=true&w=majority";

const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return { filename: "file_" + Date.now(), bucketName: "image" };
  },
});
const upload = multer({ storage });

MongoClient.connect(url)
.then(client => {
  console.log('connected to db');
  const db = client.db('truchas');
   tagCollection = db.collection('tag');  
   userCollection = db.collection('user');  
   imageChunkCollection = db.collection('image.chunks')
   imageFileCollection = db.collection('image.files')
   app.locals.collection = tagCollection;
  })

//Sessions set up
// const fileStore = sessionFileStore(session);
  
  // Set up a session middleware to handle user sessions.
// NOTE: A secret is used to sign the cookie. This is just used for this sample
// app and should be changed.
// const sessionMiddleware = session({
//   resave: true,
//   saveUninitialized: true,
//   store: new fileStore({}),
//   secret: 'photo frame sample',
// });

// Enable user session handling.
// app.use(sessionMiddleware);

// Set up passport and session handling.
// app.use(passport.initialize());
// app.use(passport.session());


app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/getUser", function(req, res) {
  userCollection.findOne({'_id': new ObjectID(req.query.id)}).then((result) => res.send(result));

  
})
// Use Multer and GridFS to upload images into Db
app.post("/uploadImage", upload.any(), async function (req, res) {
  console.log("upload Image");
  console.log(req.files)
  try {
      var files = req.files;
      var id = files.map((file) => file.id);
      console.log(`return id ${id}`);
      res.send({id: id});
  } 
  catch (error) {
    res.status(500).json({error: error.toString()});
  }
    //TODO: return success message 
    
});

app.post("/uploadPointer", jsonParser, async function (req, res) {
  try {
    let json = req.body;
    app.locals.collection.insertOne(json, (err, result) => {
      res.send(result.insertedId);
    })
  } catch (error) {
    res.status(505).json({error: error.toString()})
  }
});

app.post("/getGeoJSON", urlParser, async function (req, res) {
  //TODO: function to convert query into MongoDB query
  // console.log(`tag collection : ${tagCollection.find({})}`)
  let query = req.body.query;
  let tags = tagCollection.find(query);
  let geoJSONTag = [];
  await tags.forEach((tag) => {
    if (tag.category == "Point") {
      geoJSONTag.push({
        type: "Feature",
        properties: { cluster: false, id: tag._id, emoji: tag.emoji},
        geometry: {
          type: tag.category,
          coordinates: [parseFloat(tag.lng), parseFloat(tag.lat)],
        },
      });
    }
  });
  res.send(geoJSONTag);
});

app.get("/getAllUser", async function (req, res) {
  let user = userCollection.find({});
  let userData = [];
  await user.forEach((u) => {
    userData.push({ label: u.name, value: u._id });
  });
  res.send(userData);
});

app.get('/getTag', async function (req, res) {
  let id = req.query.id;
  tagCollection.findOne({"_id" : new ObjectID(id)}).then(tag => {
    res.send(tag);
  })
})

app.get('/getImage', async function (req, res) {
  //TODO: error handling
  let idArray = req.query.id;
  idArray = Array.isArray(idArray) ? idArray : [idArray];

  const getUrl = (id) => async function() {
    const filePromise = imageFileCollection.findOne({'_id': new ObjectID(id)})
    const chunkPromise = imageChunkCollection.find({'files_id': new ObjectID(id)}).sort({n:1}).toArray();

    return Promise.all([filePromise, chunkPromise]).then((values) => {

      let file = values[0];
      let chunks = values[1];

      let fileData = [];
      chunks.forEach(c => {
          fileData.push(c.data.toString('base64'))
        })
      let dataUrl = 'data:' + file.contentType + ';base64,' + fileData.join(''); 
      
      return dataUrl;
    })
  }

  Promise.all(idArray.map(id => getUrl(id)())).then(values => {res.send(values)});

})

// For temporary data loading from google photos, need edit for development 
app.get('/getAlbumContent', async function (req, res) {
  console.log(`TOKEN: ${req.query.token}`)
  const token = req.query.token;
  const data = {
    'albumId': config.albumId,
    'pageSize': 1
  }
  axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', data,
    {
      headers: {
        'Content-type': 'Application/json',
        'Authorization' : `Bearer ${token}`
      },
    }
  ).then((response) => {
    console.log(response.data)
    res.send(response.data);
  }).catch((error) => {console.log(error); res.send(error)});

})

//same origin 
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

console.log("Trying to run on port: " + port);
app.listen(port);
