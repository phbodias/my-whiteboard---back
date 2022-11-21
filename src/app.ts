import express from "express";
import cors from "cors";
import route from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use(route);

export default app;
