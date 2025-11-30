const path = require('path');

const fs = require('fs');
//this does the leg work of discovering the pdfs and meta data which it then returns to the server
function getPdfs(dir) {
    const pdfs = [];

    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (path.extname(file).toLowerCase() === '.pdf') {
            pdfs.push({
            name: file,
            fullPath: path.join(dir, file),
            });
        }
    }
  return pdfs;
}

function metadata(dir) {
    const pdfs = getPdfs(dir);
    const results = [];

    for (const pdf of pdfs) {
        const metadataFile = `${pdf.name}.json`;
        const metadataPath = path.join(dir, metadataFile);
        let data = null;

        if (fs.existsSync(metadataPath)) {
                data = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        }
            
        results.push({
            ...pdf,
            metadata: data
        });
    }

    return results;
}

function response(dir){
    return metadata(dir);
}

module.exports = response;