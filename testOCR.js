const extractText = require('./ocr');

extractText('sample.png')
    .then(text => console.log(text))
    .catch(err => console.error(err));