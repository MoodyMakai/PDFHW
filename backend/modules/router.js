const express = require('express');
const path = require("path");
const validate = require('./pdfValidate');
const response = require('./pdfDiscovery')

const PDF_DIR = path.join(__dirname, '..', 'pdfs');

const route = express.Router();
//responsible for routing the pdfs through the server, finds pdfs in directory and creates path

route.get('/', (req, res) => {
    const pdfs = response(PDF_DIR);
    res.render('files', { pdfs });
});

route.get('/:name', (req, res) => {
    const pdfName = req.params.name;
    const result = validate(pdfName, PDF_DIR);

    res.sendFile(result.adress);
});


module.exports = { route };