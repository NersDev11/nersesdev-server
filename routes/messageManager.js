import axios from "axios";
import { transporter } from "../utils/nodemailer.js";
import { validateMessage } from "../utils/validateMessage.js";
import { detectBots } from "../utils/detectBots.js";

const myEmail = process.env.EMAIL;
const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

export async function sendMessage(req, res) {
  const { name, email: sendersEmail, subject, text, lastName } = req.body;

  if (detectBots({ lastName }))
    return res.status(500).json({ error: "Bot detected" });

  console.log("1ok");
  if (!validateMessage({ name, sendersEmail, subject, text }))
    return res.status(500).json({ error: "Invalid data" });

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
    return res.status(500).json({ error: "Error sending message" });
  }

  res.json({ success: true });
}
