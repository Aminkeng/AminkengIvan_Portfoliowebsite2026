const nodemailer = require('nodemailer');
const logger = require('./logger');

let transporter;

const getTransporter = () => {
  if (transporter) return transporter;

  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  return transporter;
};

/**
 * Send notification email when a contact form is submitted.
 */
const sendContactNotification = async ({ name, email, subject, message }) => {
  const transport = getTransporter();
  const recipient = process.env.CONTACT_RECIPIENT || process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;

  const mailOptions = {
    from: `"Portfolio Contact" <${smtpUser}>`,
    to: recipient,
    replyTo: email,
    subject: `[Portfolio] New message from ${name}: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Portfolio Contact
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Subject:</td>
            <td style="padding: 8px;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f4f4f4; border-radius: 8px;">
          <strong>Message:</strong>
          <p style="white-space: pre-wrap; margin-top: 8px;">${message}</p>
        </div>
        <p style="margin-top: 20px; color: #888; font-size: 12px;">
          Sent from your portfolio contact form.
        </p>
      </div>
    `,
    text: `New portfolio contact\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
  };

  const info = await transport.sendMail(mailOptions);
  logger.info(`Contact email sent: ${info.messageId}`);
  return info;
};

/**
 * Send auto-reply to the person who filled in the form.
 */
const sendContactAutoReply = async ({ name, email }) => {
  const transport = getTransporter();
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;

  const mailOptions = {
    from: `"BigJones Portfolio" <${smtpUser}>`,
    to: email,
    subject: "Thanks for reaching out!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hi ${name},</h2>
        <p>
          Thank you for your message! I've received your enquiry and will get back 
          to you as soon as possible – usually within 24–48 hours.
        </p>
        <p>In the meantime, feel free to check out my latest work on my portfolio.</p>
        <p style="margin-top: 32px;">Best regards,<br/><strong>BigJones</strong></p>
        <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;" />
        <p style="color: #888; font-size: 12px;">
          This is an automated reply. Please do not respond to this email directly.
        </p>
      </div>
    `,
  };

  const info = await transport.sendMail(mailOptions);
  logger.info(`Auto-reply sent to ${email}: ${info.messageId}`);
  return info;
};

module.exports = { sendContactNotification, sendContactAutoReply };
