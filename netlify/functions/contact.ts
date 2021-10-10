import { Handler, HandlerResponse } from "@netlify/functions";
import fetch from "node-fetch";

const WRONG_METHOD: HandlerResponse = {
  statusCode: 405,
  body: "Method not allowed.",
};

const MISSING_BODY: HandlerResponse = {
  statusCode: 400,
  body: "Missing body.",
};

const MALFORMED_BODY: HandlerResponse = {
  statusCode: 400,
  body: "Malformed body.",
};

const INTERNAL_ERROR: HandlerResponse = {
  statusCode: 500,
  body: "Internal error.",
};

const SUCCESSFUL: HandlerResponse = {
  statusCode: 200,
  body: "Message sent successfully.",
};

const handler: Handler = async (event) => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

  if (event.httpMethod !== "POST") return WRONG_METHOD;
  if (!event.body) return MISSING_BODY;
  if (!TELEGRAM_BOT_TOKEN) {
    console.error("Telegram token is not set.");
    return INTERNAL_ERROR;
  }
  if (!TELEGRAM_CHAT_ID) {
    console.error("Telegram chat_id is not set.");
    return INTERNAL_ERROR;
  }

  let body: {
    subject: string;
    message: string;
    email?: string;
  };

  try {
    body = JSON.parse(event.body);
  } catch {
    return MALFORMED_BODY;
  }

  let email: string = "n/a";
  if (body.email) {
    email = body.email.replace(".", "\\.");
  }

  try {
    const sendResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: `
            *Subject: ${body.subject}*\n_Message_: ${body.message}\n_Contact_: ${email}
          `,
          parse_mode: "MarkdownV2",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!sendResponse.ok || sendResponse.status !== 200) {
      const json: {
        description?: string;
      } = await sendResponse.json();
      console.error(
        `Something went wrong while sending the message. Error: ${json.description}`
      );
    }
  } catch (error) {
    console.debug(error);
    return INTERNAL_ERROR;
  }

  return SUCCESSFUL;
};

export { handler };
