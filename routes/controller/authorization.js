const passport = require("passport");
const MongooseService = require("../../models/authoriation.js");
const User = require("../../models/shemas/user.js");
const JWT = require("jsonwebtoken");

require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await MongooseService.findUser(email);
    if (user) {
      return res.status(409).json({
        status: "Error",
        code: 409,
        message: "Email in use",
      });
    }

    const newUser = new User({ username, email, password });
    await newUser.setPassword(password);
    await newUser.save();

    return res.status(201).json({
      status: "Success",
      code: 201,
      message: "User successfully created!",
      user: {
        username: newUser.username,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await MongooseService.findUser(email);

    if (!user) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: "User doesn't exist",
      });
    }

    const isPasswordCorrect = await user.validPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "Error",
        code: 401,
        message: "Email or password is wrong",
        data: "Bad request",
      });
    } else {
      const payload = {
        id: user._id,
        username: user.username,
      };
      const secret = process.env.SECRET;
      const token = JWT.sign(payload, secret, { expiresIn: "2h" });

      user.token = token;
      user.save();

      return res.status(200).json({
        status: "Success",
        code: 200,
        message: "Successfully logged in.",
        token: token,
        user: {
          username: user.username,
          email: user.email,
          subscription: user.subscription,
        },
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const authMiddleWare = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
module.exports = { register, login, authMiddleWare };
