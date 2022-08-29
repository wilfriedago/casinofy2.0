import "dotenv/config";
import db from "./Config/database.config";
import app from "./app";

const port = process.env.SERVER_PORT;

db.sync().then(() => {
  console.log("🚀 Connection to the database established 🚀");
});

app.listen(port, () => {
  console.log(`✨ Server is running on port ${port} ✨`);
});
