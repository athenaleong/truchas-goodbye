
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://chris:password@cluster0.2lusr.mongodb.net/truchas?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

export default client;
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
