let ImageKit = require('imagekit');

let imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

function uploadFie(file) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file:file.buffer,
            fileName: "helloCohort"
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        })
    });
}

module.exports = uploadFie;