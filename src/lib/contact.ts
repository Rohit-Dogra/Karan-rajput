export const enquiryTypes = ["Live show / concert", "Private event", "Collaboration", "Press / interview", "Other"] as const;

export type Enquiry = {
  name: string;
  email: string;
  type: (typeof enquiryTypes)[number];
  date?: string;
  location?: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the form (instant feedback) and the API route (authoritative check). */
export function validateEnquiry(input: Record<string, unknown>): { data?: Enquiry; errors: FieldErrors } {
  const str = (k: string, max: number) => (typeof input[k] === "string" ? (input[k] as string).trim().slice(0, max) : "");
  const data = {
    name: str("name", 120),
    email: str("email", 200),
    type: str("type", 60) as Enquiry["type"],
    date: str("date", 20) || undefined,
    location: str("location", 160) || undefined,
    message: str("message", 4000),
  };
  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!enquiryTypes.includes(data.type)) errors.type = "Choose what the enquiry is about.";
  if (data.date && Number.isNaN(Date.parse(data.date))) errors.date = "Use a valid date.";
  if (data.message.length < 20) errors.message = "Tell us a little more (at least 20 characters).";
  return Object.keys(errors).length ? { errors } : { data, errors };
}

/** True when the server has somewhere to deliver enquiries. */
export function contactConfigured() {
  return Boolean((process.env.RESEND_API_KEY && process.env.BOOKING_EMAIL) || process.env.CONTACT_WEBHOOK_URL);
}
