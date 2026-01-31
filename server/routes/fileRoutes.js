import express from "express";
import { createFile, createShareLink, deleteFilePermanently, deleteLink, driveFiles, getBinFiles, getExistingLink, getSharedFile, getStarredFiles, moveFileToBin, readFiles, restoreFile, toggleFileStar, updateFile } from "../controllers/fileController.js"


const router = express.Router();


// CREATE
router.post("/:parentDirId", createFile);
router.post("/", createFile);

router.post("/drive/import", driveFiles)

// READ
router.get('/starred', getStarredFiles );
router.get("/bin", getBinFiles);
router.get("/:id", readFiles);
// router.get("/", readFiles);

// UPDATE
router.patch("/:id", updateFile);
router.patch("/", updateFile);

//STAR
router.patch('/:id/starred', toggleFileStar );

//SHARE
router.post('/share/:fileId', createShareLink )
router.get('/share/:fileId', getExistingLink )
router.get('/s/:token', getSharedFile)
router.delete('/revoke/:fileId', deleteLink)

// DELETE
router.delete("/:id/permanently", deleteFilePermanently);
router.patch("/:id/bin", moveFileToBin);
router.patch("/:id/restore", restoreFile);


export default router;
