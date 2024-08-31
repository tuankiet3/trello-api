const express = require("express")
const mongoose = require("mongoose")

const server = express()

const PORT = process.env.PORT || 5000

server.get("/", (req, res) => {
    res.send("Hello World")
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
