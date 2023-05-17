const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//! Midelware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ccknyay.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const productCallection = client.db("emaJhonDB").collection("pruducts");

    app.get("/pruducts", async (req, res) => {
      const result = await productCallection.find().toArray();
      res.send(result);
    });

    app.get("/totolproducts", async (req, res) => {
      const result = await productCallection.estimatedDocumentCount();
      res.send({ totalCount: result });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//todo: main route
app.get("/", (req, res) => {
  res.send("Ema Jhon server is running..............");
});

app.listen(port, () => {
  console.log(`ema jhon server is running on ${port}`);
});
