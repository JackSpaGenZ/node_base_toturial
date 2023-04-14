const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://jackietruong:dat1234567@cluster0.emwfw.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    /* try-catch-finally statement to handle errors and ensure that the
    MongoDB client is properly closed after the database operations are completed. */
    try {
        await client.connect();
        await listDatabases(client);
        await findListings(client, {
            minimumNumberOfBedrooms: 3,
            minimumNumberOfBathroms: 4,
            maximumNumberOfResults: 5
        });
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

async function findListings(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathroms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("bye").collection("vn").find(
        {
            bedrooms: { $gte: minimumNumberOfBedrooms },
            bathrooms: { $gte: minimumNumberOfBathroms }
        }).sort({ last_review: -1 })
        .limit(maximumNumberOfResults);

    const result = await cursor.toArray();

    if (result.lenngth > 0) {
        console.log(`Found listing with at least ${minimumNumberOfBedrooms} Bedrooms and ${minimumNumberOfBathroms} Bathrooms`);
        result.forEach((result, i) => {
            date = new Date(result.last_review).toDateString();
            console.log();
            console.log(`${i + 1}. name : ${result.name}`);
            console.log(` _id : ${result._id}`);
            console.log(` bedrooms : ${result.bedrooms}`);
            console.log(` bathrooms : ${result.bathrooms}`);
            console.log(` most recent review date : ${new Date(result.last_review.toDateString())}`)
        });

    } else {
        console.log(`Not found`);
    }
}






