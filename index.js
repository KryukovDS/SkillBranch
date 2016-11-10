var express = require('express');
var cors = require('cors');
var colors = require('colors/safe');

var app = express();
var port = 80;

var lessons = {};

lessons['/2a/'] = require('./lessons/2a/');
lessons['/2b/'] = require('./lessons/2b/');
lessons['/fake2b/'] = require('./lessons/2b-fake/');
lessons['/2c/'] = require('./lessons/2c/');

app.use(cors());
app.listen(port, function () {
    console.log('');
    console.log(colors.cyan('Сервер запущен, адрес сайта: ') + colors.green('http://127.0.0.1:' + port));
    console.log(colors.cyan('Доступны запросы по адресам: ') + colors.green(Object.keys(lessons).join(' ')));
    console.log('');
});

for (let url in lessons) {
    if (lessons.hasOwnProperty(url)) {
        app.get(url, function(req, res) {
            var handler = lessons[url];
            var result = handler(req);
            res.status(200).send(result.toString());
        });
    }
}