console.log("Hello modified 2 from inside a Docker container!");

const { MongoClient } = require('mongodb');

const url = "mongodb://mongo:27017";
const dbName = "testdb";

(async function () {
    try{
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("messages")
        await collection.insertOne({ msg: "Hello from Dockerized Node.js!" });
        const docs = await collection.find().toArray();
        console.log("Messages from DB:", docs);
        client.close();
    } catch (err){
        console.error("DB connection error:", err);
    }
})();