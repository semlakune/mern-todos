const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
let dbConnect

async function connect() {
    try {
        await client.connect();
        dbConnect = client.db('todosdb');
    } catch (err) {
        await client.close();
        console.log(err);
    }
}

const getDb = () => {
    if (dbConnect) {
        return dbConnect;
    }
    throw 'No database found!';
}

module.exports ={
    connect,
    getDb
}