import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
  let body: { name?: string; email?: string; date?: string; time?: string; timezone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { name, email, date, time, timezone } = body;

  if (!name || !email || !date || !time) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, date, time" },
      { status: 400 }
    );
  }

  // Same Nodemailer config as app/api/contact/route.ts — uses same .env (EMAIL_USER, EMAIL_PASS, EMAIL_TO)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Call Booking from ${name}`,
      html: `
        <h3>New Call Booking Request</h3>
        <p><strong>Name:</strong> ${String(name)}</p>
        <p><strong>Email:</strong> ${String(email)}</p>
        <p><strong>Date:</strong> ${String(date)}</p>
        <p><strong>Time:</strong> ${String(time)}</p>
        ${timezone ? `<p><strong>Timezone:</strong> ${String(timezone)}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Email failed" },
      { status: 500 }
    );
  }
}
