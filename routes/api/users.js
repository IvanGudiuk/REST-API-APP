const express = require("express");
const ctrl = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  registerSchema,
  subscriptionSchema,
  emailSchema,
} = require("../../schemas/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validateBody(registerSchema), ctrlWrapper(ctrl.login));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.post(
  "/verify",
  validateBody(emailSchema),
  ctrlWrapper(ctrl.resendVerify)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.current));

router.get("/auth/verify/:verificationToken", ctrlWrapper(ctrl.verification));

router.patch(
  "/",
  authenticate,
  validateBody(subscriptionSchema),
  ctrlWrapper(ctrl.subscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.avatarUpload)
);

module.exports = router;
