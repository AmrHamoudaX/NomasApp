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
import { categoryRouter } from "./controllers/categories.js";
import multer from "multer";

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
app.use("/api/categories", categoryRouter);
app.use("/images", express.static("images"));
app.use("/api/images", imageRouter);

//BEGINNING OF MIDDLEWARE AND SETUP
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage(); //Store uploaded files in memory
const upload = multer({ storage: storage }); //Initialize multer with the storage config
app.post("/api/images", upload.single("file"), async (req, res) => {
  // Using upload.single("file"), Multer accepts a single file with the given fieldname ("file") and stores it in req.file.
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: "Please upload a file" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
//END OF MIDDLEWARE AND SETUP

app.use(express.static(path.join(__dirname, "dist")));
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});
app.use(unknownEndpoint);
app.use(loggerError);

export { app };
