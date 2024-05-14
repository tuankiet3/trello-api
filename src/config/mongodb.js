import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "./environment.js";
let trelloDatabaseInstance = null;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const Connect_DB = async () => {
  // connect to the database server
  await client.connect();
  //   get database by dabase name and assign trelloDatabaseInstance variable
  trelloDatabaseInstance = client.db(env.DATABASE_NAME);
};

// close the database server
export const Close_DB = async () => {
  await client.close();
};

export const Get_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("not connected to database server");
  else return trelloDatabaseInstance;
};
