import { Resend } from "resend";
import { RESEND_API_KEY } from "./config.js";

const resend = new Resend(RESEND_API_KEY);

export default async function sendReceiptEmail({
    to,
    subject,
    pdfBuffer,
    orderId,
}) {
    try {
        await resend.emails.send({
            from: "Nomas <onboarding@resend.dev>", // Update this with your verified domain
            to: [to],
            subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #667eea; margin-bottom: 20px;">New Order Receipt</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #333;">
                        A new order #${orderId} has been completed and payment has been processed successfully.
                    </p>
                    <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 15px;">
                        Please find the receipt attached to this email with all order details.
                    </p>
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
                        <p style="font-size: 14px; color: #666;">
                            <strong>Order ID:</strong> ${orderId}
                        </p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: `receipt${orderId}.pdf`,
                    content: Buffer.from(pdfBuffer),
                },
            ],
        });
        console.log(
            `Receipt email sent successfully to ${to} for order #${orderId}`,
        );
    } catch (error) {
        console.error("Error sending receipt email:", error);
        throw error;
    }
}
