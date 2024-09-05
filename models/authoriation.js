const User = require("./shemas/user.js");

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};
const findUserById = async (id) => {
  return await User.findById(id);
};
const createUser = async ({ username, email, password, avatarURL }) => {
  return await new User({ username, email, password, avatarURL });
};
module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};
