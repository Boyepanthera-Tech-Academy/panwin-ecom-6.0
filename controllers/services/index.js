const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

const SendEmail = (data) => {
  const msg = {
    to: data.receiver, // Change to your recipient
    from: process.env.SENDGRID_SENDER, // Change to your verified sender
    subject: data.subject,
    html: data.body,
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
