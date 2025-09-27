import express from "express";
import { productRouter } from "./controllers/products.js";

const app = express();

app.use(express.json());
app.use("/api/products", productRouter);

export { app };
