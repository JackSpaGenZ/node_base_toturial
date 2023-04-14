const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://jackietruong:dat1234567@cluster0.emwfw.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    /* try-catch-finally statement to handle errors and ensure that the
    MongoDB client is properly closed after the database operations are completed. */
    try {
        await client.connect();

        await listDatabases(client);
    
        await findOneListingByName(client, 'VietNam'); // insert client and VietNam is name of Listing
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

main().catch(console.error);


async function listDatabases(client) {
    /* retrieving a list of all databases in the MongoDB cluster and printing their names
    to the console. */
    const databasesList = await client.db().admin().listDatabases();
    console.log("Database : ");
    databasesList.databases.forEach(db => {
        console.log(`-${db.name}`);
    });
}

async function findOneListingByName(client, nameOfListing){
    const result = await client.db("bye").collection("vn").findOne({name : nameOfListing});
    // using condition to notificate found or not found with name was inserted
    if (result) {
        console.log(`Collection Founded with name : '${nameOfListing}'`);
        console.log(result);    
    } else {
        console.log(`no collection founded with name : ${nameOfListing}`);
    }
}
