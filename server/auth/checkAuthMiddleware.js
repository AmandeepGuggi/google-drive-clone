import User from "../modals/userModal.js";
import crypto from "node:crypto";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
  debug: false,
});

const secretKey = process.env.SecretKey

export default async function checkAuthMiddleware(req, res, next) {
   const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Not logged!" });
    }
  
    const [payload, oldSignature] = token.split(".");
  
    const jsonPayload = Buffer.from(payload, "base64url").toString();
  
      const newSignature = crypto
      .createHash("sha256")
      .update(secretKey)
      .update(jsonPayload)
      .update(secretKey)
      .digest("base64url");
  
    if (oldSignature !== newSignature) {
      res.clearCookie("token");
      console.log("Invalid signature");
      return res.status(401).json({ error: "Not logged in!" });
    }
  
      const { id, expiry: expiryTimeInSeconds } = JSON.parse(jsonPayload);
      const currentTimeInSeconds = Math.round(Date.now() / 1000);
      
  
    if (currentTimeInSeconds > expiryTimeInSeconds) {
      res.clearCookie("token");
      return res.status(401).json({ error: "Not logged in!" });
    }

  const user = await User.findOne({ _id: id});
  if (!user) {
    return res.status(401).json({ error: "Not logged!" });
  }
  req.user = user
  next()
}
