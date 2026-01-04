import express from "express";
import checkAuth from "../auth/checkUserAuth.js";
import { loginUser, logout, registerUser } from "../controllers/userController.js";
import Session from "../modals/sessionModal.js";
import User from "../modals/userModal.js";

const router = express.Router();

export  async function checkUserAuth(req, res, next) {
  const { sid } = req.signedCookies;
  console.log("RAW cookie header:", req.headers.cookie);
  console.log("cookies:", req.cookies);
console.log("signedCookies:", req.signedCookies);

  if (!sid) {
    return res.status(401).json({ error: "No sid ,Not authenticated, Not logged!" });
  }

  const session = await Session.findById(sid)

   if(!session) {
     return res.status(401).json({ error: "Not logged!" });
    }

  const user = await User.findOne({ _id: session.userId}).lean();
  if (!user) {
    return res.status(401).json({ error: "Not logged!" });
  }
  req.user = user
  next()
}

router.post('/register', registerUser)

router.post('/login', loginUser)


router.post('/', checkAuth ,  (req, res) => {
  res.status(200).json({
    name: req.user.fullname,
    email: req.user.email,
  })
})

router.post('/logout', logout)

export default router;
