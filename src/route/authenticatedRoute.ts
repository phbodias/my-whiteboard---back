import { Request, Response, Router } from "express";
import { authenticatedController } from "../controllers/authenticatedController";
import { validateJWT } from "../middlewares/validateJWT";

const authenticatedRoute = Router();

authenticatedRoute.use(validateJWT);

authenticatedRoute.get("/authenticated", authenticatedController);

export default authenticatedRoute;
