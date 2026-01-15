import express from "express";

import { createDirectory, deleteFolderPermanently, getBinFolders, getDirectoryBreadcrumbs, getDirectorybyId, getStarredDirectories, moveFolderToBin, renameDirectory, restoreFolder, toggleDirectoryStar } from "../controllers/directoryController.js";
import checkAuth from "../auth/checkUserAuth.js";


const router = express.Router();

router.get('/starred', getStarredDirectories);
router.get("/bin", getBinFolders);
router.get("/" , getDirectorybyId);
router.get("/:id" , getDirectorybyId);

router.post("/:parentDirId", checkAuth, createDirectory);
router.post("/", checkAuth, createDirectory);

router.patch('/:id', renameDirectory);
router.patch('/', renameDirectory);


router.patch('/:id/starred', toggleDirectoryStar);
router.get('/:id/breadcrumbs', getDirectoryBreadcrumbs);

// DELETE
router.delete("/:id/permanently", deleteFolderPermanently);
router.patch("/:id/bin", moveFolderToBin);
router.patch("/:id/restore", restoreFolder);

export default router;
