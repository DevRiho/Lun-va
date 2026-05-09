import nodemailer from 'nodemailer';
import logger from '../utils/logger';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const createTransporter = () => {
  // If we have Resend API Key, use SMTP configuration for Resend
  if (process.env.RESEND_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.resend.com',
      secure: true,
      port: 465,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
      },
    });
  }

  // Fallback to Mailtrap or local dev settings
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.EMAIL_PORT || '2525'),
    auth: {
      user: process.env.EMAIL_USER || 'user',
      pass: process.env.EMAIL_PASS || 'pass',
    },
  });
};

export const sendEmail = async (options: EmailOptions) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: 'Lunéva <noreply@luneva.com>', // Note: With Resend this must be a verified domain
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(`Error sending email: ${error}`);
  }
};
