import db from "../database/database.connection.js";

async function newProduct(req, res) {
  try {
    await db.products.insertOne(req.body);
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function getProducts(_req, res) {
  try {
    const products = await db.products.find().toArray();
    res.send(products).status(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function deleteProducts(req, res) {
  const { name } = req.body;
  try {
    await db.products.deleteMany({ name: name });
    res.status(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export default { newProduct, getProducts, deleteProducts };
