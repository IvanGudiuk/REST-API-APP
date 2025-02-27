const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { current } = require("./current");
const { subscription } = require("./subscription");
const { avatarUpload } = require("./avatarUpload");
const { verification } = require("./verification");
const { resendVerify } = require("./resendVerify");

module.exports = {
  register,
  login,
  logout,
  current,
  subscription,
  avatarUpload,
  verification,
  resendVerify,
};
