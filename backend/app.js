import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Routers
import { productRouter } from "./controllers/products.js";
import { userRouter } from "./controllers/users.js";
import { orderRouter } from "./controllers/orders.js";
import { loginRouter } from "./controllers/login.js";
import { orderItemRouter } from "./controllers/orderItems.js";
import { categoryRouter } from "./controllers/categories.js";
import { imageRouter } from "./controllers/images.js";

// Middleware & utils
import { logger, unknownEndpoint } from "./util/middleware.js";
import { loggerError } from "./util/logger.js";

const app = express();

/* ----------------------------------
   Path helpers (ESM replacement)
---------------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ----------------------------------
   Middleware
---------------------------------- */
app.use(express.json());
app.use(logger);

/* ----------------------------------
   API routes
---------------------------------- */
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/login", loginRouter);
app.use("/api/orderItems", orderItemRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/images", imageRouter);

/* ----------------------------------
   Serve static frontends
---------------------------------- */
const frontendPath = path.join(__dirname, "frontend-dist");
const adminPath = path.join(__dirname, "admin-dist");

// Serve admin panel under /admin
app.use("/admin", express.static(adminPath));
app.get("/admin/{*splat}", (req, res) => {
  res.sendFile(path.resolve(adminPath, "index.html"));
});

//Serve main
app.use(express.static(frontendPath));
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

/* ----------------------------------
   Error handling
---------------------------------- */
app.use(unknownEndpoint);
app.use(loggerError);

export { app };
