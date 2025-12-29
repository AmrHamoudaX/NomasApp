import { Router } from "express";
import { supabase } from "../util/supabase.js";
import multer from "multer";
import { Image } from "../models/index.js";
import { requireAdmin, tokenExtractor } from "../util/middleware.js";

const router = Router();

//BEGINNING OF MULTER AND SUPABASE SETUP
const storage = multer.memoryStorage(); //Store uploaded files in memory
const upload = multer({ storage: storage }); //Initialize multer with the storage config
router.post(
  "/",
  tokenExtractor,
  requireAdmin,
  upload.single("file"),
  async (req, res) => {
    // Using upload.single("file"), Multer accepts a single file with the given fieldname ("file") and stores it in req.file.
    const file = req.file;
    try {
      if (!file) {
        console.log(req.file);
        res.status(400).json({ message: "Please upload a file" });
        return;
      }
      //upload the file to supabase
      const { data, error } = await supabase.storage
        .from("images")
        .upload(file.originalname, file.buffer, {
          contentType: file.mimetype,
        });
      if (error) {
        console.log(data);
        throw error;
      }
      //get public url of the uploaded file
      const { data: image } = supabase.storage
        .from("images")
        .getPublicUrl(data.path);

      const postImage = await Image.create({
        productId: req.body.productId,
        imageurl: image.publicUrl,
      });
      res.status(200).json({ postImage });
    } catch (error) {
      console.log(req.body);
      console.log(req.file);
      res.status(500).json({ error: error.message });
    }
  },
);
//END OF MULTER AND SUPABASE SETUP

const imageFinder = async (req, res, next) => {
  req.image = await Image.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const images = await Image.findAll();
  res.json(images);
});

router.get("/:id", imageFinder, async (req, res) => {
  if (req.image) {
    res.json(req.image);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", imageFinder, async (req, res) => {
  if (req.image) {
    await req.image.destroy();
  }
  res.status(204).end();
});

export { router as imageRouter };
