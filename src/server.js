import express from "express";
const app = express();
const hostname = "localhost";
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, hostname, () => {
  console.log(`I am running server on ${hostname}:${port}`);
});
