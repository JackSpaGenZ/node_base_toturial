const { MongoClient } = require("mongodb");

async function Main() {
  const uri =
    "mongodb+srv://jackietruong:dat1234567@cluster0.emwfw.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("connected with dat database");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

Main().catch(console.error);


