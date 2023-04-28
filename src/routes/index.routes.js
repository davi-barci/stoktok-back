import { Router } from "express";
import usersRoutes from "./users.routes.js";

const routes = Router();

routes.use(usersRoutes)

routes.all("*", (_req, res) => {
  res.sendStatus(404);
});

export default routes;