const path = require('path');

const fs = require('fs');


function PDFValidate(pdfName, pdfDirectory) {
    const adress = path.join(pdfDirectory, pdfName);
    if (!fs.existsSync(adress)) {
        return {
            ok: false,
            status: 404,
            error: "PDF not found"
        };
    }

    return {
        ok: true,
        adress
    };
}

module.exports = PDFValidate;