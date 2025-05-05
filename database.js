const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://zrzranananan:zx0896999000@manage-member.1v6ojoq.mongodb.net/?retryWrites=true&w=majority&appName=manage-member";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);

const db = client.db('Manage-Member')
const members = db.collection('members')

const getMembers = async () => {
    try {
        await client.connect();
        const result = await members.find().toArray()
        return result
    } catch (e) {
        console.warn(e)
    } finally {
        await client.close()
    }
}

const getMember = async (query) => {
    try {
        await client.connect();
        const result = await members.findOne(query)
        return result
    } catch (e) {
        console.warn(e)
    } finally {
        await client.close()
    }
}

module.exports = {
    getMembers,
    getMember
}