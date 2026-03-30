"use client";

import { useBookingModal } from "@/context/BookingModalContext";
import React, { useCallback, useState } from "react";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_RESUME_TYPE = "application/pdf";
const PDF_EXT = ".pdf";

const MAX_LEN = {
  name: 200,
  email: 254,
  phone: 50,
  role: 200,
  message: 10000,
} as const;

function sanitizeInput(s: string, maxLen: number): string {
  return s
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLen);
}

const ROLE_OPTIONS = [
  { value: "", label: "Select role..." },
  { value: "software-engineer", label: "Software Engineer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "designer", label: "Designer" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "devops", label: "DevOps / Infrastructure" },
  { value: "sales-associate", label: "Sales Associate" },
  { value: "sales-manager", label: "Sales Manager" },
  { value: "human-resource-manager", label: "Human Resource Manager" },
  { value: "other", label: "Other" },
];

const EXPERIENCE_OPTIONS = [
  { value: "", label: "Select years..." },
  { value: "0-1", label: "0–1 years" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5-10", label: "5–10 years" },
  { value: "10+", label: "10+ years" },
];

const inputBase =
  "w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-muted transition-all duration-200 focus:outline-none focus:ring-0 focus:border-accent-primary focus:shadow-input-focus bg-white border border-border-default shadow-input-shadow";
const selectBase =
  "w-full px-4 py-3 rounded-lg text-text-primary transition-all duration-200 focus:outline-none focus:ring-0 focus:border-accent-primary focus:shadow-input-focus bg-white border border-border-default min-h-[44px] shadow-input-shadow selection:bg-accent-primary-muted";

export default function ApplyNowForm() {
  const { closeApplyModal } = useBookingModal();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [roleOther, setRoleOther] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [coverMessage, setCoverMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateResume = useCallback((file: File): string | null => {
    const name = (file.name || "").trim().toLowerCase();
    if (!name.endsWith(PDF_EXT)) {
      return "Only PDF files are allowed.";
    }
    if (file.type !== ACCEPTED_RESUME_TYPE) {
      return "Only PDF files are allowed.";
    }
    if (file.size > MAX_RESUME_BYTES) {
      return "File size must be 5MB or less.";
    }
    return null;
  }, []);

  const handleResumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setResumeError(null);
      if (!file) {
        setResumeFile(null);
        return;
      }
      const error = validateResume(file);
      if (error) {
        setResumeError(error);
        setResumeFile(null);
        e.target.value = "";
        return;
      }
      setResumeFile(file);
    },
    [validateResume],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResumeError(null);
    setSubmitError(null);

    const finalRole = role === "other" ? roleOther.trim() : role;
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !finalRole ||
      !yearsOfExperience ||
      !coverMessage.trim()
    ) {
      return;
    }
    if (!resumeFile) {
      setResumeError("Resume (PDF) is required.");
      return;
    }
    const resumeErr = validateResume(resumeFile);
    if (resumeErr) {
      setResumeError(resumeErr);
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("name", sanitizeInput(fullName, MAX_LEN.name));
      formData.set("email", sanitizeInput(email, MAX_LEN.email));
      formData.set("phone", sanitizeInput(phone, MAX_LEN.phone));
      formData.set("role", sanitizeInput(finalRole, MAX_LEN.role));
      formData.set("experience", yearsOfExperience);
      formData.set("message", sanitizeInput(coverMessage, MAX_LEN.message));
      formData.set("resume", resumeFile);

      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSubmitError(
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        );
        return;
      }

      setSuccess(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setRole("");
      setRoleOther("");
      setYearsOfExperience("");
      setCoverMessage("");
      setResumeFile(null);
      setResumeError(null);
      const input = document.getElementById("apply-resume") as HTMLInputElement;
      if (input) input.value = "";
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-5 text-center">
        <p className="text-lg text-text-primary">
          Thanks for applying — we received your application and will be in
          touch soon.
        </p>
        <button
          type="button"
          onClick={closeApplyModal}
          className="w-full py-4 rounded-lg font-semibold text-white bg-accent-primary hover:bg-accent-primary-hover focus:outline-none focus:shadow-input-focus transition-all duration-200 shadow-glow-primary-soft"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="apply-now-form space-y-5">
      {/* Full Name */}
      <div>
        <label
          htmlFor="apply-fullName"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          Full Name <span className="text-[var(--accent-primary)]">*</span>
        </label>
        <input
          type="text"
          id="apply-fullName"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputBase}
          placeholder="Your full name"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="apply-email"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          Email Address <span className="text-[var(--accent-primary)]">*</span>
        </label>
        <input
          type="email"
          id="apply-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputBase}
          placeholder="you@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="apply-phone"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          Phone Number <span className="text-[var(--accent-primary)]">*</span>
        </label>
        <input
          type="tel"
          id="apply-phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputBase}
          placeholder="+1 234 567 8900"
        />
      </div>

      {/* Role Applying For */}
      <div>
        <label
          htmlFor="apply-role"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          Role Applying For <span className="text-[var(--accent-primary)]">*</span>
        </label>
        <select
          id="apply-role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={selectBase}
          aria-label="Role applying for"
        >
          {ROLE_OPTIONS.map((opt) => (
            <option
              key={opt.value || "empty"}
              value={opt.value}
              className="apply-select-option"
            >
              {opt.label}
            </option>
          ))}
        </select>
        {role === "other" && (
          <input
            type="text"
            value={roleOther}
            onChange={(e) => setRoleOther(e.target.value)}
            className={`${inputBase} mt-2`}
            placeholder="Specify role"
            required
          />
        )}
      </div>

      {/* Years of Experience */}
      <div>
        <label
          htmlFor="apply-experience"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          Years of Experience <span className="text-[var(--accent-primary)]">*</span>
        </label>
        <select
          id="apply-experience"
          required
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
          className={selectBase}
          aria-label="Years of experience"
        >
          {EXPERIENCE_OPTIONS.map((opt) => (
            <option
              key={opt.value || "empty"}
              value={opt.value}
              className="apply-select-option"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Cover Message */}
      <div>
        <label
          htmlFor="apply-cover"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          Cover Message <span className="text-[var(--accent-primary)]">*</span>
        </label>
        <textarea
          id="apply-cover"
          required
          rows={4}
          value={coverMessage}
          onChange={(e) => setCoverMessage(e.target.value)}
          className={`${inputBase} resize-none`}
          placeholder="Tell us why you're a great fit..."
        />
      </div>

      {/* Resume Upload */}
      <div>
        <label
          htmlFor="apply-resume"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          Resume <span className="text-[var(--accent-primary)]">*</span>{" "}
          <span className="text-text-muted font-normal">(PDF only, max 5MB)</span>
        </label>
        <input
          type="file"
          id="apply-resume"
          accept=".pdf,application/pdf"
          onChange={handleResumeChange}
          className="w-full text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[var(--accent-primary)] file:text-white file:font-medium file:cursor-pointer cursor-pointer shadow-sm"
        />
        {resumeFile && (
          <p className="mt-2 text-sm text-text-secondary">
            Selected: {resumeFile.name}
          </p>
        )}
        {resumeError && (
          <p className="mt-2 text-sm text-red-500 font-medium" role="alert">
            {resumeError}
          </p>
        )}
      </div>

      {submitError && (
        <p className="text-sm text-red-400" role="alert">
          {submitError}
        </p>
      )}

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-lg font-semibold text-white bg-accent-primary hover:bg-accent-primary-hover focus:outline-none focus:shadow-input-focus disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-glow-primary-soft"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
