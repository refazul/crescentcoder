
var fs = require('fs'),
request = require('request');

var download = function (uri, filename) {
console.log(uri, filename)
return new Promise((resolve, reject) => {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
    });
});
};

var promises = [];
for (var i = 0; i <= 10; i++) {
var filename = 'page' + i + '.jpg';
promises.push(download('https://pageflip-books.com/ppp/page' + i + '.jpg', filename));
}

Promise.all(promises).then((values) => {
console.log('done');
})