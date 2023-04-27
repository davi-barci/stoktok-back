import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.all("*", (_req, res) => {
  res.send("hello world!");
});

app.listen(5000, () => console.log("xablau!"));
