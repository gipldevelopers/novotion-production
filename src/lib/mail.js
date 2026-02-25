import nodemailer from 'nodemailer';
import prisma from './prisma';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Error sending mail:', error);
    throw error;
  }
};

/**
 * Adds an email to the queue to be sent later
 */
export const queueEmail = async ({ to, subject, html }) => {
  try {
    const queuedEmail = await prisma.emailQueue.create({
      data: {
        to,
        subject,
        html,
        status: 'PENDING'
      }
    });

    // Try to process the queue in the background (non-blocking)
    processEmailQueue().catch(err => console.error('Error triggering queue process:', err));

    return queuedEmail;
  } catch (error) {
    console.error('Error queuing email:', error);
    // Fallback: try sending immediately if queuing fails
    return sendMail({ to, subject, html });
  }
};

/**
 * Processes pending emails in the queue
 */
export const processEmailQueue = async () => {
  const pendingEmails = await prisma.emailQueue.findMany({
    where: {
      status: 'PENDING',
      attempts: { lt: 3 }
    },
    take: 10 // Process in batches
  });

  for (const email of pendingEmails) {
    try {
      await sendMail({
        to: email.to,
        subject: email.subject,
        html: email.html
      });

      await prisma.emailQueue.update({
        where: { id: email.id },
        data: {
          status: 'SENT',
          attempts: email.attempts + 1
        }
      });
    } catch (error) {
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: {
          status: email.attempts + 1 >= 3 ? 'FAILED' : 'PENDING',
          attempts: email.attempts + 1,
          lastError: error.message
        }
      });
    }
  }
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #1e3a8a; margin-bottom: 24px;">Reset Your Password</h2>
      <p style="color: #475569; font-size: 16px; line-height: 24px;">
        You recently requested to reset your password for your Novotion account. Click the button below to proceed:
      </p>
      <div style="margin: 32px 0; text-align: center;">
        <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="color: #475569; font-size: 14px; line-height: 20px;">
        Or copy and paste this link into your browser:
      </p>
      <p style="color: #2563eb; font-size: 14px; word-break: break-all;">
        ${resetUrl}
      </p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
      <p style="color: #94a3b8; font-size: 12px;">
        If you didn't request a password reset, you can safely ignore this email. This link will expire in 1 hour.
      </p>
    </div>
  `;

  return queueEmail({
    to: email,
    subject: 'Reset your password - Novotion',
    html,
  });
};

export const sendPaymentReceiptEmail = async (user, payment, items) => {
  const itemsHtml = items.map(item => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7; text-align: right;">$${item.price.toFixed(2)}</td>
        </tr>
    `).join('');

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #059669; margin: 0;">Payment Successful</h2>
        <p style="color: #6b7280;">Thank you for your purchase!</p>
      </div>
      
      <div style="margin-bottom: 24px; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
        <p style="margin: 0 0 8px 0;"><strong>Order ID:</strong> ${payment.orderId}</p>
        <p style="margin: 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <thead>
            <tr style="background-color: #f3f4f6;">
                <th style="padding: 8px; text-align: left; border-bottom: 2px solid #e5e7eb;">Item</th>
                <th style="padding: 8px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price</th>
            </tr>
        </thead>
        <tbody>
            ${itemsHtml}
        </tbody>
        <tfoot>
            <tr>
                <td style="padding: 16px 8px 8px 8px; font-weight: bold;">Total</td>
                <td style="padding: 16px 8px 8px 8px; font-weight: bold; text-align: right;">$${payment.amount.toFixed(2)}</td>
            </tr>
        </tfoot>
      </table>

      <div style="text-align: center; margin-top: 32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background-color: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
          View in Dashboard
        </a>
      </div>
      
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
      <p style="color: #94a3b8; font-size: 12px; text-align: center;">
        If you have any questions, please contact our support team.
      </p>
    </div>
    `;

  return queueEmail({
    to: user.email,
    subject: `Payment Receipt - Order ${payment.orderId}`,
    html
  });
};

export const sendAdminPaymentNotification = async (payment, user, items) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  const itemsList = items.map(item => `${item.name} ($${item.price})`).join(', ');

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f0fdf4;">
      <h2 style="color: #166534; margin-bottom: 16px;">New Payment Received</h2>
      <p style="font-size: 16px; color: #1f2937;">A new payment has been successfully processed on Novotion.</p>
      
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #dcfce7; margin-top: 20px;">
        <p style="margin: 0 0 10px 0;"><strong>Customer:</strong> ${user.name || 'N/A'} (${user.email})</p>
        <p style="margin: 0 0 10px 0;"><strong>Amount:</strong> $${payment.amount.toFixed(2)} ${payment.currency}</p>
        <p style="margin: 0 0 10px 0;"><strong>Order ID:</strong> ${payment.orderId}</p>
        <p style="margin: 0 0 10px 0;"><strong>Items:</strong> ${itemsList}</p>
        <p style="margin: 10px 0 0 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      </div>
      
      <div style="margin-top: 24px; text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/payments" style="background-color: #166534; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">
          View Payment in Admin
        </a>
      </div>
    </div>
    `;

  return queueEmail({
    to: adminEmail,
    subject: `New Payment Received: $${payment.amount.toFixed(2)} from ${user.email}`,
    html
  });
};
