import express from "express";
import checkAuth, { checkIsAdmin, notRegularUser } from "../auth/checkUserAuth.js";
import { delteSpecificUser, getAllUsers, loginUser, logout, logoutAll, logoutSpecificUser, registerUser } from "../controllers/userController.js";


const router = express.Router();

router.post('/user/register', registerUser)

router.post('/user/login', loginUser)

router.get('/users',checkAuth, notRegularUser, getAllUsers)

router.get('/user', checkAuth ,  (req, res) => {
  res.status(200).json({
    name: req.user.fullname,
    email: req.user.email,
    picture: req.user.picture,
    storage:  req.user.storageUsed,
    role: req.user.role
  })
})
 
router.post('/user/:id/logout',checkAuth, notRegularUser, logoutSpecificUser)
router.delete('/user/:id/delete',checkAuth, checkIsAdmin, delteSpecificUser)

router.post('/user/logout',checkAuth, logout)
router.post('/user/logoutAll', checkAuth, logoutAll )


export default router;
