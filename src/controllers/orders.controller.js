import db from "../database/database.connection.js";

async function create(req, res) {
  await db.orders.insertOne(req.body);
  return res.sendStatus(200);
}

export default { create };
