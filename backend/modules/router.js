const express = require('express');
const path = require("path");
const valid = require('./pdfValidate');
const response = require('./pdfDiscovery')

const PDF_DIR = path.join(__dirname, '..', 'pdfs');

const route = express.Router();


route.get('/', (req, res) => {
    const pdfs = response(PDF_DIR);
    res.render('files', { pdfs });
});

route.get('/:name', (req, res) => {
    const pdfName = req.params.name;
    const result = valid(pdfName, PDF_DIR);

    if (!result.ok) {
        return res.status(404).send("file not found");
    }

    res.sendFile(result.fullPath);
});


module.exports = { route };