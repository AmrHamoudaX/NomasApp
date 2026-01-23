import puppeteer from "puppeteer";

export default async function generatePdfFromHtml(html) {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
        width: "148mm",
        height: "210mm",
        printBackground: true,
        margin: {
            top: "6mm",
            right: "6mm",
            bottom: "6mm",
            left: "6mm",
        },
        pageRanges: "1",
    });

    await browser.close();
    return pdfBuffer;
}
