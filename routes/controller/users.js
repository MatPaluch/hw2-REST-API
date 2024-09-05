const fs = require("fs").promises;
const { Jimp } = require("jimp");
const multer = require("multer");
const { nanoid } = require("nanoid");
const path = require("path");
const { findUserById } = require("../../models/authoriation");

const pathToTempDir = path.join(process.cwd(), "temporary/images");
const pathToStoreImages = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, callbback) => {
    callbback(null, pathToTempDir);
  },
  filename: (req, file, callback) => {
    callback(null, `${nanoid()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const extensionsWhiteList = [".jpg", "jpeg", ".png", ".gif", "webp"];
    const mimetypeWhiteList = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (
      !extensionsWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return callback(null, false);
    }

    return callback(null, true);
  },
  limits: { fileSize: 1048576 },
});

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: "File is not a picture.",
      });
    }
    const nameFile = req.file.filename;
    const pathFile = req.file.path;
    const newPathFile = path.join(pathToStoreImages, nameFile);

    try {
      await Jimp.read(pathFile)
        .then((image) => {
          image.resize({ w: 250, h: 250 }).write(pathFile);
        })
        .catch((error) => error);
    } catch (error) {
      console.error("Error processing image:", error);
      return next(error);
    }

    try {
      await fs.rename(pathFile, newPathFile);
    } catch (error) {
      await fs.unlink(pathFile);
      next(error);
    }

    const user = req.user;

    user.avatarURL = path.join("http://localhost:8000/avatars", nameFile);
    user.save();

    return res.status(200).json({ user: user, message: "Avatar updated." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
module.exports = { updateAvatar, upload };
