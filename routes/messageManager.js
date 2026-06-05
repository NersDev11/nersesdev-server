import axios from "axios";
import { transporter } from "../utils/nodemailer";

const myEmail = process.env.EMAIL;
const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

export async function sendMessage(req, res) {
  const { name, email: sendersEmail, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: myEmail,
      to: myEmail,
      subject,
      text,
      replyTo: sendersEmail,
    });

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${sendersEmail}\nSubject: ${subject}\nMessage: ${text}`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error sending message");
  }

  res.json({ success: true });
}
