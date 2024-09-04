const express = require("express");
const router = express.Router();
const authOperations = require("../controller/authorization");

router.post("/signup", authOperations.register);

router.post("/login", authOperations.login);

router.get("/list", authOperations.authMiddleWare, (req, res, next) => {
  const { username } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${username}`,
    },
  });
});

module.exports = router;
