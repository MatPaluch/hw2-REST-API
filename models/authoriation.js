const User = require("./shemas/user.js");

const findUser = async (email) => {
  return User.findOne({ email: email });
};
module.exports = {
  findUser,
};
