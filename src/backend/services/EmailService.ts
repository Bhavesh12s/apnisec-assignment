import { Resend } from "resend";

export class EmailService {
  private static resend = new Resend(process.env.RESEND_API_KEY!);
  private static from = process.env.FROM_EMAIL!;

  static async sendWelcome(email: string) {
    await this.resend.emails.send({
      from: this.from,
      to: email,
      subject: "Welcome to ApniSec 🚀",
      html: `
        <h2>Welcome to ApniSec</h2>
        <p>Your cybersecurity journey starts here.</p>
        <p>We're glad to have you onboard.</p>
      `,
    });
  }

  static async sendIssueCreated(
    email: string,
    title: string,
    type: string
  ) {
    await this.resend.emails.send({
      from: this.from,
      to: email,
      subject: "New Issue Created",
      html: `
        <h3>Issue Created Successfully</h3>
        <p><b>Type:</b> ${type}</p>
        <p><b>Title:</b> ${title}</p>
      `,
    });
  }
}
