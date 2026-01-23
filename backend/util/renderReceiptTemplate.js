import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function renderReceiptTemplate(data) {
    const templatePath = path.join(__dirname, "../templates/receipt.html");
    let html = fs.readFileSync(templatePath, "utf8");

    // Calculate subtotal
    const subtotal = data.items.reduce(
        (sum, item) => sum + Number(item.total),
        0,
    );

    // Format receipt date
    const receiptDate =
        data.receiptDate ||
        new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    // Render items HTML as table rows
    const itemsHtml = data.items
        .map(
            (item) => `
        <tr>
          <td class="item-name">${item.name}</td>
          <td class="item-quantity">${item.quantity}</td>
          <td class="item-price">$${Number(item.price).toFixed(2)}</td>
          <td class="item-total">$${Number(item.total).toFixed(2)}</td>
        </tr>
      `,
        )
        .join("");
    console.log("--------data--------");
    console.log(data);
    console.log("----end data------");
    // Replace all placeholders
    html = html
        .replace("/{{orderId}}/g", data.orderId || "")
        .replace("{{logoUrl}}", data.logoUrl || "")
        .replace("{{fullName}}", data.fullName || "N/A")
        .replace("{{email}}", data.email || "N/A")
        .replace("{{phoneNumber}}", data.phoneNumber || "N/A")
        .replace("{{addressLine1}}", data.addressLine1 || "N/A")
        .replace("{{addressLine2}}", data.addressLine2 || "")
        .replace("{{city}}", data.city || "N/A")
        .replace("{{receiptDate}}", receiptDate)
        .replace("{{subtotal}}", subtotal.toFixed(2))
        .replace("{{totalAmount}}", data.totalAmount.toFixed(2))
        .replace("{{shippingFee}}", data.shippingFee.toFixed(2))
        .replace("{{stripePaymentIntentId}}", data.stripePaymentIntentId || "")
        .replace("{{items}}", itemsHtml);

    // Handle conditional addressLine2
    if (!data.addressLine2) {
        html = html.replace(/{{#if addressLine2}}[\s\S]*?{{\/if}}/g, "");
    } else {
        html = html.replace(/{{#if addressLine2}}/g, "").replace(/{{\/if}}/g, "");
    }

    // Handle conditional stripePaymentIntentId
    if (!data.stripePaymentIntentId) {
        html = html.replace(/{{#if stripePaymentIntentId}}[\s\S]*?{{\/if}}/g, "");
    } else {
        html = html
            .replace(/{{#if stripePaymentIntentId}}/g, "")
            .replace(/{{\/if}}/g, "");
    }

    return html;
}
