import { Router } from "express";
import authenticatedRoute from "./authenticatedRoute";
import userRoute from "./userRoute";

const route = Router();

route.use(userRoute);
route.use(authenticatedRoute);

export default route;
