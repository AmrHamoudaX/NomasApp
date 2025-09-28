import express from "express";
import { productRouter } from "./controllers/products.js";
import { logger, unknownEndpoint } from "./util/middleware.js";
import { loggerError } from "./util/logger.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/products", productRouter);
app.use(unknownEndpoint);
app.use(loggerError);

export { app };
