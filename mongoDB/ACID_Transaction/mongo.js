
const {MongoClient} = require('mongodb');

async function main(){

    const uri = 'mongodb+srv://jackietruong:dat1234567@cluster0.emwfw.mongodb.net/?retryWrites=true&w=majority';

    const client = new MongoClient(uri);

 try {
    await client.connect();
    await console.log('connect successfully');
 } finally {
    await client.close();
 }
}

main().catch(console.error);