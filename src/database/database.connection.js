import "dotenv/config";
import { MongoClient } from "mongodb";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL)
  throw Error("Please configure your DATABASE_URL in .env file!");

const client = new MongoClient(DATABASE_URL);

try {
  await client.connect();
  console.log("Successfully connected to database!");
} catch (error) {
  console.log(error);
}

const db = client.db();

const users = db.collection("users");
const sessions = db.collection("sessions");
const products = db.collection("products");
const wishlist = db.collection("wishlist");
const orders = db.collection("orders");

export default { users, sessions, products, orders, wishlist  };
