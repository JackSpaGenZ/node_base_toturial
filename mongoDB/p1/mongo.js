const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://jackietruong:dat1234567@cluster0.emwfw.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    /* try-catch-finally statement to handle errors and ensure that the
    MongoDB client is properly closed after the database operations are completed. */
    try {
        await client.connect();
        // await createListing(client, {
        //     name: "VietNam",
        //     National: "Viet Nam",
        //     say: "Xin Chao",
        //     react: "Friendly"
        // })
        await createMutipleListings(client, [
            {
                name : "VietNam",
                nation : "Viet Nam",
                say : "chao nhe",
                react : "friendly"
            },
            {
                name : "NgheAn",
                nation : "Nghe An, Viet Nam",
                say : "chao bay hay",
                react : "cute"
            },
            {
                name : "DatChao",
                nation : "Dat Style, Viet Nam",
                say : "Bai bai hay",
                react : "yolo"
            }
        ]);
        await listDatabases(client);
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

async function createListing(client, newListing) {
    const result = await client.db("hello").collection("vn").insertOne(newListing);
    console.log(`New Listing with id : ${result.insertedId}`);
}

async function createMutipleListings(client, newListings) {
    const result = await client.db("bye").collection("vn").insertMany(newListings);
    console.log(`${result.insertedCount} new listings created with the following id(s):`);
    console.log(result.insertedIds);
}








