import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../database/database.connection.js";
import errors from "../errors/index.js";

async function register(req, res) {
  const { email, password } = req.body;

  const isNotUniqueEmail = await db.users.findOne({ email });
  if (isNotUniqueEmail) throw errors.conflict();

  const hashedPassword = bcrypt.hashSync(password, 10);
  await db.users.insertOne({ ...req.body, password: hashedPassword });

  res.sendStatus(201);
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await db.users.findOne({ email });
  if (!user) throw errors.unauthorized();

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) throw errors.unauthorized();

  const sessionToken = uuid();
  const existingSession = await db.sessions.findOne({ userId: user._id });

  if (existingSession) {
    await db.sessions.updateOne({ userId: user._id }, { $set: { token: sessionToken } });
  } else {
    await db.sessions.insertOne({ token: sessionToken, userId: user._id });
  }

  res.send(sessionToken);
}

async function logout(_req, res) {
  await db.sessions.deleteOne(res.locals.session);
  return res.sendStatus(204);
}

export default { register, login, logout };