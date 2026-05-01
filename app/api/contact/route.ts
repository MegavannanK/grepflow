import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, projectType, message } = body;

    // Configure your SMTP server here. 
    // For production, you should use an App Password from Gmail, SendGrid, Resend, or AWS SES.
    // Store these credentials in your .env.local file!
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail'
      auth: {
        user: process.env.EMAIL_USER || 'your-placeholder@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password', 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-placeholder@gmail.com',
      to: process.env.EMAIL_USER || 'your-placeholder@gmail.com', // Where you want to RECEIVE the emails
      replyTo: email, // So you can hit "Reply" to the user's email
      subject: `[Grepflow Lead] New Project Inquiry: ${projectType}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #00d261;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <h3 style="color: #333;">Message Details:</h3>
          <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}