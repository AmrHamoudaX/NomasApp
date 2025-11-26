import express from "express";
import { productRouter } from "./controllers/products.js";
import { logger, unknownEndpoint } from "./util/middleware.js";
import { loggerError } from "./util/logger.js";
import { userRouter } from "./controllers/users.js";
import { orderRouter } from "./controllers/orders.js";
import { loginRouter } from "./controllers/login.js";
import { orderItemRouter } from "./controllers/orderItems.js";
import { imageRouter } from "./controllers/images.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(logger);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/login", loginRouter);
app.use("/api/orderItems", orderItemRouter);
app.use("/images", express.static("images"));
app.use("/api/images", imageRouter);
app.use(express.static(path.join(__dirname, "dist")));
app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});
app.use(unknownEndpoint);
app.use(loggerError);

export { app };
