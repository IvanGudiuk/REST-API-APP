const Joi = require("joi");
const { Schema } = require("mongoose");

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegExp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: { type: String, required: true },
    token: { type: String, default: "" },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    "any.required": "missing required field email",
  }),
});

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string(),
});

module.exports = {
  userSchema,
  registerSchema,
  subscriptionSchema,
  emailSchema,
};
