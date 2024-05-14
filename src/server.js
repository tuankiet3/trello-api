import express from "express";
import exitHook from "async-exit-hook";
import { Connect_DB, Close_DB } from "./config/mongodb.js";
import { env } from "./config/environment.js";

const Start_Server = () => {
  const app = express();

  app.get("/", async (req, res) => {
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`I am running at ${env.APP_HOST}:${env.APP_PORT}`);
  });

  // clean up after stop server
  // https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  exitHook(() => {
    Close_DB();
  });
};

// Immediately Invoked Function Expression (IIFE)
(async () => {
  try {
    console.log("Connected to server");
    await Connect_DB();
    Start_Server();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
