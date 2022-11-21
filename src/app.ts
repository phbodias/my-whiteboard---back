import express from "express";
import cors from "cors";
import "express-async-errors";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";
import route from "./route";

const app = express();
app.use(cors());
app.use(express.json());

app.use(route);
app.use(errorHandlerMiddleware);

export default app;
