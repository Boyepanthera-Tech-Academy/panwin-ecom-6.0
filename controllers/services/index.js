const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_KEY);

const SendEmail = (data) => {
  console.log(data.receiver);
  console.log(data.subject);
  console.log(process.env.SENDGRID_SENDER);
  const msg = {
    to: data.receiver, // Change to your recipient
    from: process.env.SENDGRID_SENDER, // Change to your verified sender
    subject: data.subject,
    html: "hello from the password reset app",
  };
  return sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};

module.exports = {
  SendEmail,
};
