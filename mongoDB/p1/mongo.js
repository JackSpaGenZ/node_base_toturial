const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://jackietruong:dat1234567@cluster0.emwfw.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    /* try-catch-finally statement to handle errors and ensure that the
    MongoDB client is properly closed after the database operations are completed. */
    try {
        await client.connect();
        await listDatabases(client);
        // await createListing(client, {
        //     name: "VietNam",
        //     National: "Viet Nam",
        //     say: "Xin Chao",
        //     react: "Friendly"
        // })
        // await createMutipleListings(client, [
        //     {
        //         name: "VietNam",
        //         nation: "Viet Nam",
        //         say: "chao nhe",
        //         react: "friendly"
        //     },
        //     {
        //         name: "NgheAn",
        //         nation: "Nghe An, Viet Nam",
        //         say: "chao bay hay",
        //         react: "cute"
        //     },
        //     {
        //         name: "DatChao",
        //         nation: "Dat Style, Viet Nam",
        //         say: "Bai bai hay",
        //         react: "yolo"
        //     }
        // ]);
        await findOneListingByName(client, 'VietNam');
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

async function createListing(client, newListing) {
    const result = await client.db("hello").collection("vn").insertOne(newListing);
    console.log(`New Listing with id : ${result.insertedId}`);
}

async function createMutipleListings(client, newListings) {
    const result = await client.db("bye").collection("vn").insertMany(newListings);
    console.log(`${result.insertedCount} new listings created with the following id(s):`);
    console.log(result.insertedIds);
}

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("bye").collection("vn").findOne({ name: nameOfListing });
    if (result) {
        console.log(`Collection Founded with name : '${nameOfListing}'`);
        console.log(result);
    } else {
        console.log(`no collection founded with name : ${nameOfListing}`);
    }
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






