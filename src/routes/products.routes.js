import { Router } from "express";
import products from "../controllers/products.controller.js";

const productsRoutes = Router();

productsRoutes.post("/", products.newProduct);
productsRoutes.get("/", products.getProducts);
productsRoutes.delete("/deletar", products.deleteProducts);
productsRoutes.post("/newsletter", products.sendEmailNewsletter);

export default productsRoutes;