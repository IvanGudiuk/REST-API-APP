require("dotenv").config();
const nodemailer = require("nodemailer");

const { UKRNET_KEY, UKRNET_USER, BASE_URL } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKRNET_USER,
    pass: UKRNET_KEY,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendMail = async (data) => {
  const email = { ...data, from: UKRNET_USER };
  await transport.sendMail(email);
  return true;
};

module.exports = sendMail;

//   const email = {
//     to: "nigar85943@vaband.com",
//     from: UKRNET_USER,
//     subject: "test",
//     html: "<p>test</p>",
//   };

//   transport
//     .sendMail(email)
//     .then(() => console.log("success"))
//     .catch((e) => console.log(e.message));
