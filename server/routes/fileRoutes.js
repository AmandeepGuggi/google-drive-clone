import express from "express";
import { createFile, deleteFile, readFiles, updateFile } from "../controllers/fileController.js"
import multer from "multer";


const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});


// CREATE
router.post("/:parentDirId", createFile);
router.post("/", createFile);


// READ
router.get("/:id", readFiles);
// router.get("/", readFiles);

// UPDATE
router.patch("/:id", updateFile);
router.patch("/", updateFile);

// DELETE
router.delete("/:id", deleteFile);

//GET ALL
// router.get("/", (req,res) => {
//     res.send("all files")
// })


export default router;
