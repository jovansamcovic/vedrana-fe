import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, projectType, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Atelier Vedrana Marković <onboarding@resend.dev>",
      to: "jsamcovic1996@gmail.com",
      replyTo: email,
      subject: `Nova poruka od ${name}${projectType ? ` — ${projectType}` : ""}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; color: #2C2C2A;">
          <p style="color: #C4A053; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 24px;">
            Atelier Vedrana Marković — Nova poruka
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; color: #78716c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; width: 140px;">Ime</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; color: #44403c;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; color: #78716c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; color: #44403c;">${email}</td>
            </tr>
            ${projectType ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; color: #78716c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Vrsta projekta</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e7e5e4; color: #44403c;">${projectType}</td>
            </tr>
            ` : ""}
          </table>

          <p style="color: #78716c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 12px;">Poruka</p>
          <p style="color: #44403c; line-height: 1.8; white-space: pre-wrap;">${message}</p>

          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />
          <p style="color: #a8a29e; font-size: 11px;">
            Odgovorite direktno na ovaj email da kontaktirate ${name} na ${email}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}