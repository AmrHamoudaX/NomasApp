import fs from "fs";
import path from "path";

function imageToBase64(imagePath) {
    const ext = path.extname(imagePath).replace(".", "");
    const buffer = fs.readFileSync(imagePath);
    return `data:image/${ext};base64,${buffer.toString("base64")}`;
}
const logoBase64 = imageToBase64(
    path.join(process.cwd(), "/assets/CapioLogo.jpg"),
);
export default logoBase64;
