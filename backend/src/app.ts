import express from "express";
import { UserRouter, GameRouter } from "./Routes";

const app = express();

app.use(express.json());

app.use("/v1/games", GameRouter);
app.use("/v1/users", UserRouter);

export default app;
