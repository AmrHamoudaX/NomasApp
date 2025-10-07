import express from "express";
import { productRouter } from "./controllers/products.js";
import { logger, unknownEndpoint } from "./util/middleware.js";
import { loggerError } from "./util/logger.js";
import { userRouter } from "./controllers/users.js";
import { orderRouter } from "./controllers/orders.js";
import { loginRouter } from "./controllers/login.js";
import { orderItemRouter } from "./controllers/orderItems.js";
import { imageRouter } from "./controllers/images.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/login", loginRouter);
app.use("/api/orderItems", orderItemRouter);
app.use("/images", express.static("images"));
app.use("/api/images", imageRouter);
app.use(unknownEndpoint);
app.use(loggerError);

export { app };
