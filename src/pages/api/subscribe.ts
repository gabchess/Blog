/**
 * POST /api/subscribe
 *
 * Mailgun mailing list subscription endpoint.
 * Ported from octant-blog/app/api/subscribe/route.ts (Next.js -> Astro API route).
 * The Mailgun REST API call shape is preserved exactly.
 *
 * Required env vars:
 *   MAILGUN_API_KEY       Mailgun private API key
 *   MAILGUN_LIST_ADDRESS  Full list address, e.g. newsletter@mg.octant.build
 *
 * Optional env vars:
 *   MAILGUN_REGION        "us" (default) or "eu"
 *
 * Compiles to a Vercel serverless function at /api/subscribe.
 * One isolated function; no persistent server runtime.
 */

import type { APIRoute } from "astro";

export const prerender = false;

const isValidEmailFormat = (email: string): boolean => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(String(email).toLowerCase());
};

const getMailgunBaseUrl = (): string => {
  const region = process.env.MAILGUN_REGION?.toLowerCase();
  return region === "eu"
    ? "https://api.eu.mailgun.net/v3"
    : "https://api.mailgun.net/v3";
};

const createAuthHeader = (apiKey: string): string => {
  return `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`;
};

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (typeof body !== "object" || body === null || !("email" in body)) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email } = body as { email: unknown };

  if (typeof email !== "string" || !isValidEmailFormat(email)) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const normalizedEmail = email.toLowerCase();
  const apiKey = process.env.MAILGUN_API_KEY;
  const listAddress = process.env.MAILGUN_LIST_ADDRESS;

  if (!apiKey || !listAddress) {
    console.error("Missing Mailgun configuration");
    return new Response(JSON.stringify({ ok: false, error: "internal" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const baseUrl = getMailgunBaseUrl();
  const url = `${baseUrl}/lists/${listAddress}/members`;

  const formData = new URLSearchParams();
  formData.append("address", normalizedEmail);
  formData.append("subscribed", "yes");
  formData.append("upsert", "yes");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: createAuthHeader(apiKey),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      console.error("Mailgun API error:", {
        status: response.status,
        message: data.message,
      });

      if (
        response.status === 400 &&
        data.message?.toLowerCase().includes("already exists")
      ) {
        return new Response(
          JSON.stringify({ ok: false, error: "already_subscribed" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(JSON.stringify({ ok: false, error: "internal" }), {
        status: response.status >= 500 ? 500 : 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "Subscription API error:",
      error instanceof Error ? error.message : error
    );
    return new Response(JSON.stringify({ ok: false, error: "internal" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
