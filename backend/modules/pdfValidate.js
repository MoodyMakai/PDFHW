const path = require('path');

const fs = require('fs');
//validates the pdfs and returns the adress to server.js

function PDFValidate(pdfName, pdfDirectory) {
    const adress = path.join(pdfDirectory, pdfName);
    return { adress };
}

module.exports = PDFValidate;