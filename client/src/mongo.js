
async function connectDb() {  
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://<user>:<password>@cluster0.2lusr.mongodb.net/<dbname>?retryWrites=true&w=majority";
    const client = await new MongoClient(uri, { useNewUrlParser: true });
    return client;
}