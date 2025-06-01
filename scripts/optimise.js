const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processAllImages() {
    const inputDir = path.join(process.cwd(), '/public/images');
    const files = fs.readdirSync(inputDir);

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

        const filePath = path.join(inputDir, file);
        const buffer = fs.readFileSync(filePath);
        const baseName = path.parse(file).name;

        const result = await OptimiseImage(buffer, baseName);
        console.log(result ? `Optimised: ${result}` : `Failed: ${file}`);
    }
}



async function OptimiseImage(imageBuffer, name) {

    try {

        const image_name = `${name}.webp`;
        const image_path = path.join(process.cwd(), '/public/new-images', image_name);

        await sharp(imageBuffer)
            .resize(231, 320)
            .sharpen({ sigma: 1 })
            .toFormat('webp', { quality: 100 })
            .toFile(image_path)

        return (image_name)

    } catch (err) {
        console.log(err)
        return false
    }

}

module.exports = { processAllImages }