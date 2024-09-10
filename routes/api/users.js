const express = require("express");
const router = express.Router();
const userOperations = require("../controller/users");
const authOperations = require("../controller/authorization");

router.patch(
  "/avatars",
  authOperations.authMiddleWare,
  userOperations.upload.single("avatar"),
  userOperations.updateAvatar
);

router.get("/verify/:verificationToken", userOperations.verify);

router.post("/verify", userOperations.verifyAgain);
module.exports = router;
