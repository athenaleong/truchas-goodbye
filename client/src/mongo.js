
async function connectDb() {  
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://chris:fF1kjLnOaC769euR@cluster0.2lusr.mongodb.net/<dbname>?retryWrites=true&w=majority";
    const client = await new MongoClient(uri, { useNewUrlParser: true });
    return client;
}


export default connectDb;
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
