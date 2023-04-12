const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://jackietruong:dat1234567@cluster0.emwfw.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    /* try-catch-finally statement to handle errors and ensure that the
    MongoDB client is properly closed after the database operations are completed. */
    try {
        await client.connect();
        await createListing(client, {
            name: "VietNam",
            National: "Viet Nam",
            say: "Xin Chao",
            react: "Friendly"
        })
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

main().catch(console.error);

async function createListing(client, newListing) {
    const result = await client.db("hello").collection("vn").insertOne(newListing);
    console.log(`New Listing with id : ${result.insertedId}`);
}








