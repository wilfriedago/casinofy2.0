import express from "express";
import UserRouter from "./Http/Routes/UserRouter";

const app = express();

app.use(express.json());

app.use("/api/v1/users/", UserRouter);

export default app;
