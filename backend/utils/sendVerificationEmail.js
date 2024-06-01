const customizedEmail = require("./customizedEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
    const verifyEmailLink =  `${origin}/verify-email?token=${verificationToken}&email=${email}`; 
    const message = `<p>Please confirm your email by clicking on the following link: 
        <a href = "${verifyEmailLink}"> Verify Email </a></p>`;
        
        return customizedEmail({
            to: email,
            subject: "Email Confirmation",
            html: `<h4>Hello ${name} </h4> ${message}`,
          });
    
};

module.exports = sendVerificationEmail;
