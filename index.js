var express = require('express');
var fs = require('fs');
var cors = require('cors');
var colors = require('colors/safe');

var app = express();
var port = 80;

/**
 * Получаем обработчики уроков из модулей в разделе lessons
 * @type {{}}
 */

var lessons = {};
fs.readdirSync('./lessons').forEach(function (file) {
    var patch = './lessons/' + file;
    fs.statSync(patch).isDirectory() && (lessons['/lessons/' + file + '.html'] = require(patch));
});

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