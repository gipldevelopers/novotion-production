import nodemailer from 'nodemailer';

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

export const sendPasswordResetEmail = async (email, token) => {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

    const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
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

    return sendMail({
        to: email,
        subject: 'Reset your password - Novotion',
        html,
    });
};
