// import express
const express = require("express")
// import mongoose
const mongoose = require("mongoose")
// import dotenv
const dotenv = require("dotenv")
dotenv.config()
// import connectToMongoDB, closeMongoDBConnection and GET_DB from mongodb.js
const {
    connectToMongoDB,
    closeMongoDBConnection,
    GET_DB,
} = require("./config/mongodb")

// create a new express app
const startServer = async () => {
    // create a new express app
    const server = express()
    // create a new port
    const PORT = process.env.APP_PORT || 5000

    // connect to MongoDB
    await connectToMongoDB()

    // create a new GET route
    server.get("/", async (req, res) => {
        console.log(await GET_DB().listCollections().toArray())
        res.send("Hello World")
    })

    // start the server
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })

    // close the connection to MongoDB when the server is closed
    process.on("SIGINT", async () => {
        await closeMongoDBConnection()
        process.exit(0)
    })
}
startServer()
