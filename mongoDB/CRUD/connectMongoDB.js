const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://jackietruong:dat1234567@cluster0.emwfw.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    /* try-catch-finally statement to handle errors and ensure that the
    MongoDB client is properly closed after the database operations are completed. */
    try {
        await client.connect(async ()=>{
            console.log("database connected");
        })
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

main().catch(console.error);







