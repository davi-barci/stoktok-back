import { Router } from "express";
import orders from "../controllers/orders.controller.js";

const ordersRoutes = Router();

ordersRoutes.post("/checkout", orders.create);
ordersRoutes.post("/confirmemail", orders.sendEmailConfirm);

export default ordersRoutes;
