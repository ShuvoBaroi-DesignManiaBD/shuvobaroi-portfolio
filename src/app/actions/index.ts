"use server";
import { Resend } from "resend";

async function sendEmail({
  clientMail,
  subject,
  message,
}: {
  clientMail: string;
  subject: string;
  message: string;
}) {
  {
    const resend = new Resend("re_YcUvovXJ_EzA8DZvmdegJvxAGRfe225ti");

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: clientMail,
      subject: subject,
      html: message,
    });
    return data;
  }
}

export {sendEmail}
