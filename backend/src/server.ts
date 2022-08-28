import express, { Request, Response } from "express";
import db from "./config/database.config";

db.sync().then(() => {
  console.log("🚀 Connection to the database established 🚀");
});

const app = express();
const port: number = 9000;

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello world !");
});

app.listen(port, () => {
  console.log(`✨ Server is running on port ${port} ✨`);
});
