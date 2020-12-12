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
const {MongoClient} = require('mongodb');
const urlParser = bodyParser.urlencoded({extended: true});
const jsonParser = bodyParser.json();

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

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.post('/uploadImage', upload.any(), async function(req, res) {
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

app.post('/uploadPointer', async function(req, res) {
  console.log(req);
  console.log(req.body);
  res.end();
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


