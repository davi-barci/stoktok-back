import { Router } from "express";
import usersRoutes from "./users.routes.js";
import productsRoutes from "./products.routes.js";
import ordersRoutes from "./orders.routes.js";

const routes = Router();

routes.get("/keep-alive", (_req, res) => res.sendStatus(200));

routes.use(usersRoutes)
routes.use(productsRoutes)
routes.use(ordersRoutes)

routes.all("*", (_req, res) => {
  res.sendStatus(404);
});

export default routes;