const Tesseract = require('tesseract.js');

async function extractText(imagePath) {
    try {
        const result = await Tesseract.recognize(imagePath, 'eng');
        return result.data.text;
    } catch (error) {
        console.error(error);
    }
}

module.exports = extractText;