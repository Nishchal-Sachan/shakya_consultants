import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const PDF_MIME = "application/pdf";
const PDF_EXT = ".pdf";

const MAX_LEN = {
  name: 200,
  email: 254,
  phone: 50,
  role: 200,
  experience: 50,
  message: 10000,
} as const;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) return false;
  if (now >= entry.resetAt) {
    rateLimitMap.delete(ip);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX;
}

function recordSubmission(ip: string): void {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }
  entry.count += 1;
}

function sanitizeText(input: string, maxLen: number): string {
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLen);
}

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass },
  });
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  if (!emailUser || !emailPass) {
    return NextResponse.json(
      { error: "Service temporarily unavailable." },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const role = formData.get("role");
  const experience = formData.get("experience");
  const message = formData.get("message");
  const resume = formData.get("resume");

  if (
    name == null ||
    email == null ||
    phone == null ||
    role == null ||
    experience == null ||
    message == null ||
    resume == null
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof role !== "string" ||
    typeof experience !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { error: "Invalid field format" },
      { status: 400 }
    );
  }

  const nameSanitized = sanitizeText(name, MAX_LEN.name);
  const emailSanitized = sanitizeText(email, MAX_LEN.email);
  const phoneSanitized = sanitizeText(phone, MAX_LEN.phone);
  const roleSanitized = sanitizeText(role, MAX_LEN.role);
  const experienceSanitized = sanitizeText(experience, MAX_LEN.experience);
  const messageSanitized = sanitizeText(message, MAX_LEN.message);

  if (
    !nameSanitized ||
    !emailSanitized ||
    !phoneSanitized ||
    !roleSanitized ||
    !experienceSanitized ||
    !messageSanitized
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (!(resume instanceof File) || resume.size === 0) {
    return NextResponse.json(
      { error: "Resume file is required" },
      { status: 400 }
    );
  }

  const fileName = (resume.name || "").trim().toLowerCase();
  const hasPdfExtension = fileName.endsWith(PDF_EXT);
  if (!hasPdfExtension) {
    return NextResponse.json(
      { error: "Resume must be a PDF file" },
      { status: 400 }
    );
  }

  if (resume.type !== PDF_MIME) {
    return NextResponse.json(
      { error: "Resume must be a PDF file" },
      { status: 400 }
    );
  }

  if (resume.size > MAX_RESUME_BYTES) {
    return NextResponse.json(
      { error: "Resume must be 5MB or less" },
      { status: 400 }
    );
  }

  let resumeBuffer: Buffer;
  try {
    const ab = await resume.arrayBuffer();
    resumeBuffer = Buffer.from(ab);
  } catch {
    return NextResponse.json(
      { error: "Could not read resume file" },
      { status: 400 }
    );
  }

  const to = process.env.EMAIL_TO || emailUser;
  const transporter = getTransporter();
  if (!transporter) {
    return NextResponse.json(
      { error: "Service temporarily unavailable." },
      { status: 503 }
    );
  }

  const safeFilename = "resume.pdf";

  const adminHtml = `
    <h2>New Job Application</h2>
    <p><strong>Name:</strong> ${escapeHtml(nameSanitized)}</p>
    <p><strong>Email:</strong> ${escapeHtml(emailSanitized)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phoneSanitized)}</p>
    <p><strong>Role:</strong> ${escapeHtml(roleSanitized)}</p>
    <p><strong>Experience:</strong> ${escapeHtml(experienceSanitized)}</p>
    <p><strong>Cover message:</strong></p>
    <pre>${escapeHtml(messageSanitized)}</pre>
    <p><em>Resume attached as PDF.</em></p>
  `;

  try {
    await transporter.sendMail({
      from: `"Shakya Consultants Careers" <${emailUser}>`,
      to,
      replyTo: emailSanitized,
      subject: "📄 New Job Application Received",
      html: adminHtml,
      attachments: [
        {
          filename: safeFilename,
          content: resumeBuffer,
        },
      ],
    });
  } catch (err) {
    console.error("Apply email send error:", err);
    return NextResponse.json(
      { error: "Failed to send application. Please try again." },
      { status: 500 }
    );
  }

  try {
    await transporter.sendMail({
      from: `"Shakya Consultants" <${emailUser}>`,
      to: emailSanitized,
      subject: "Thanks for applying — we received your application",
      html: `
        <p>Hi ${escapeHtml(nameSanitized)},</p>
        <p>Thanks for applying — we received your application and will review it shortly.</p>
        <p>Best,<br/>Shakya Consultants</p>
      `,
    });
  } catch (err) {
    console.error("Applicant confirmation email error:", err);
  }

  recordSubmission(ip);
  return NextResponse.json({ success: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
