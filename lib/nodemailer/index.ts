import { EmailContent, EmailProductInfo, NotificationType } from "@/types";
import nodemailer from "nodemailer";

export const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

export const THRESHOLD_PERCENTAGE = 40;

export const generateEmailBody = (
  product: EmailProductInfo,
  type: NotificationType
) => {
  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}...`
      : product.title;

  let subject = "";
  let body = "";

  switch (type) {
    case Notification.WELCOME:
      subject = `Yay! Price Tracking started for ${shortenedTitle}`;
      body = `
      <div>
      <h2>Welcome to BargainBuddy 🚀</h2>
      <p>We have started tracking price of ${product.title}.</p>
      <p>You can now sit back and relax!!</p>
      <p>Here's an example of how you'll receive updates:</p>
      <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
        <h3>${product.title} is back in stock!</h3>
        <p>We're excited to let you know that ${product.title} is now back in stock.</p>
        <p>Don't miss out - <a href="${product.url}" target="_blank" rel="noopener noreferrer">buy it now</a>!</p>
        <img src="https://i.ibb.co/VqbqNry/Screenshot-from-2024-04-25-13-07-17.png" alt="Product Image" style="max-width: 100%;" />
      </div>
      <p>Stay tuned for more updates on ${product.title} and other products you're tracking.</p>
    </div>
      `;
      break;

    case Notification.CHANGE_OF_STOCK:
      subject = `${shortenedTitle} is now back in stock!`;
      body = `
      <div>
      <h4>Hey, ${product.title} is now restocked! Grab yours before they run out again!</h4>
      <p>See the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
    </div>
      `;
      break;

    case Notification.LOWEST_PRICE:
      subject = `Lowest Price Alert for ${shortenedTitle}`;
      body = `
      <div>
      <h4>Hey, ${product.title} has reached its lowest price ever!!</h4>
      <p>It might be a good time for you to buy this product.</p>
      <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
    </div>
      `;
      break;

    case Notification.THRESHOLD_MET:
      subject = `Discount Alert for ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hey, ${product.title} is now available at a discount more than ${THRESHOLD_PERCENTAGE}%!</h4>
          <p>Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      break;

    default:
      throw new Error("Invalid notification type.");
  }

  return { subject, body };
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  emailContent: EmailContent,
  sendTo: string[]
) => {
  const mailOptions = {
    from: {
      name: "BargainBuddy",
      address: process.env.EMAIL!,
    },
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };

  await transporter.sendMail(mailOptions);
  return {};
};
