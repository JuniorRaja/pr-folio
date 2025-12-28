import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

// CORS Configuration
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS 
  ? process.env.CORS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: process.env.CORS_ALLOW_CREDENTIALS === 'true',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">New Contact Message</h1>
          <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">From your portfolio website</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Contact Info Card -->
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #667eea;">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Contact Information</h2>
            
            <div style="margin-bottom: 15px;">
              <span style="display: inline-block; width: 80px; color: #64748b; font-weight: 500;">Name:</span>
              <span style="color: #1e293b; font-weight: 600;">${firstName} ${lastName}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <span style="display: inline-block; width: 80px; color: #64748b; font-weight: 500;">Email:</span>
              <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-weight: 500;">${email}</a>
            </div>
            
            <div>
              <span style="display: inline-block; width: 80px; color: #64748b; font-weight: 500;">Date:</span>
              <span style="color: #1e293b;">${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Kolkata'
              })}</span>
            </div>
          </div>

          <!-- Message Card -->
          <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px;">
            <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Message:</h3>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; border-left: 3px solid #10b981;">
              <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 16px;">${message}</p>
            </div>
          </div>

          <!-- Quick Actions -->
          <div style="margin-top: 30px; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 500; margin-right: 10px;">Reply to ${firstName}</a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; margin: 0; font-size: 14px;">This message was sent from your portfolio contact form</p>
          <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 12px;">prverse.dev</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      subject: `New Contact: ${firstName} ${lastName}`,
      html: htmlTemplate,
      replyTo: email
    });

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
});