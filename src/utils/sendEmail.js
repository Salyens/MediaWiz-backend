const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  const { name, phoneNumber, email } = data;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptionsToOwner = {
    from: "artyomzotov251863@gmail.com",
    to: "artyom.m.zotov@gmail.com",
    subject: `Новая заявка от ${email}`,
    html: `
      <h1>Новая заявка</h1>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phoneNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
    `,
  };
  await transporter.sendMail(mailOptionsToOwner);

  const mailOptionsToClient = {
    from: "artyomzotov251863@gmail.com",
    to: email,
    subject: "Ваша заявка принята",
    html: `
      <h1>Ваша заявка принята</h1>
      <p>Здравствуйте, ${name}!</p>
      <p>Мы получили вашу заявку и скоро свяжемся с вами.</p>
      <br>
      <p>С уважением,</p>
      <p><strong>Команда MediaWiz</strong></p>
    `,
  };

  const infoClient = await transporter.sendMail(mailOptionsToClient);
};

module.exports = sendEmail;


