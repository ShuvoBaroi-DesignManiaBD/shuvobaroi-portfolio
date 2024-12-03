"use server";
import envConfig from "@/config";
import { Resend } from "resend";
import { getPageInfo } from "./api";
import { getSiteInfo } from "./api";
// async function sendEmail({
//   clientMail,
//   subject,
//   message,
// }: {
//   clientMail: string;
//   subject: string;
//   message: string;
// }) {
//   {
//     const resend = new Resend("re_YcUvovXJ_EzA8DZvmdegJvxAGRfe225ti");

//     const data = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: clientMail,
//       subject: subject,
//       html: message,
//     });
//     return data;
//   }
// }


async function sendEmail({
  clientMail,
  subject,
  message,
}: {
  clientMail: string;
  subject: string;
  message: string;
}) {
  try {
    const resend = new Resend("re_YcUvovXJ_EzA8DZvmdegJvxAGRfe225ti");

    // Send the email
    const emailData = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: clientMail,
      subject: subject,
      html: message,
    });

    // If email is successfully sent, save the data via a POST request
    if (emailData) {
      const saveResponse = await fetch(`${envConfig.baseApi}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${envConfig.post_access_key}`,
        },
        body: JSON.stringify({data:{
          email: clientMail,
          subject: subject,
          message:message,
        }}),
      });

      // Check if the save operation was successful
      if (!saveResponse.ok) {
        throw new Error(
          `Failed to save email data: ${saveResponse.statusText}`
        );
      }

      console.log("Email data saved successfully.");
    }

    return emailData;
  } catch (error) {
    console.error("Error in sendEmail function:", error);
    throw error;
  }
}


export {sendEmail, getSiteInfo, getPageInfo};


