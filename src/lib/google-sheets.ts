import { google } from "googleapis";
import { JWT } from "google-auth-library";

let jwtClient: JWT | null = null;

function getJwtClient(): JWT {
  if (jwtClient) return jwtClient;

  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

  jwtClient = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return jwtClient;
}

export const sheets = google.sheets({
  version: "v4",
  auth: getJwtClient(),
});
