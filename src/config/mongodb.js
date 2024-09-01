const dotenv = require("dotenv")
dotenv.config()

// get the MongoDB URI and database name from the environment variables
const MONGO_URI = process.env.MONGODB_URI
const DATABASE_NAME = process.env.DATABASE_NAME

// import mongoose
const mongoose = require("mongoose")
// import MongoClient and ServerApiVersion from mongodb
const { MongoClient, ServerApiVersion } = require("mongodb")

let trelloDatabaseInstance = null

// create a new MongoClient connect to MongoDB
const client = new MongoClient(MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

// return promise
const connectToMongoDB = async () => {
    try {
        // connect to MongoDB
        await client.connect()
        // get the database instance
        trelloDatabaseInstance = client.db(DATABASE_NAME)
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message)
        process.exit(0)
    }
}

// close the connection to MongoDB
const closeMongoDBConnection = async () => {
    try {
        await client.close()
        console.log("Disconnected from MongoDB successfully")
    } catch (error) {
        console.error("Error disconnecting from MongoDB:", error.message)
    }
}

// return trelloDatabaseInstance
const GET_DB = () => {
    if (!trelloDatabaseInstance) {
        throw new Error("Database instance is not initialized")
    }
    return trelloDatabaseInstance
}
module.exports = { connectToMongoDB, closeMongoDBConnection, GET_DB }
