
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/send", async (req, res) => {
  const { name, pd, oc, frame } = req.body;

  const mailOptions = {
    from: `Bilgi Optik Ölçüm Sistemi <${process.env.EMAIL_USER}>`,
    to: "bilgioptikmailiniz@gmail.com",
    subject: `Yeni Ölçüm Talebi: ${name}`,
    text: `Ad: ${name}\nPD: ${pd} mm\nOC: ${oc} mm\nÇerçeve: ${frame}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mail gönderildi." });
  } catch (error) {
    res.status(500).json({ error: "Mail gönderilemedi.", detail: error.toString() });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
