import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email app password
      },
    });

export const sendOtpMail = async (to, otp) => {
  const mailOptions = {
    from: `"Poplix" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your OTP for Login ✨',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hey there 👋</h2>
        <p>Your OTP is:</p>
        <h1 style="color: #0d6efd">${otp}</h1>
        <p>It will expire in 5 minutes.</p>
        <br />
        <p>Love,<br/>Team Poplix 💙</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
