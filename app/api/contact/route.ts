import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

interface ContactFormPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Create transporter ONCE
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendContactEmail(
  payload: ContactFormPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    await transporter.sendMail({
      from: `"Shakya Consultants Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: payload.email,
      subject: `[Contact] ${payload.subject ?? "Website query"}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Message:</strong></p>
        <pre>${payload.message}</pre>
      `,
    });

    return { ok: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Contact email send error:", error);
    return { ok: false, error: message };
  }
}

export async function POST(req: Request) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, message" },
      { status: 400 }
    );
  }

  const result = await sendContactEmail({
    name: String(name),
    email: String(email),
    subject: body.subject ? String(body.subject) : undefined,
    message: String(message),
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "Failed to send" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
