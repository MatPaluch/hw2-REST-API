const express = require("express");
const router = express.Router();
const authOperations = require("../controller/authorization");

router.post("/signup", authOperations.register);

router.post("/login", authOperations.login);

router.get("/logout", authOperations.authMiddleWare, authOperations.logout);

router.get("/current", authOperations.authMiddleWare, authOperations.current);

router.get("/list", authOperations.authMiddleWare, (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: `,
    },
  });
});

module.exports = router;
