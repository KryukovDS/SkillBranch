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
    if (fs.statSync(patch).isDirectory()) {
        var lesson = require(patch);
        var url = '/lessons/' + file + '/';
        lessons[url] = lesson;
    }
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
        app.get(url + (lessons[url].url || ''), function(req, res) {
            lessons[url].handler(req, res, url);
        });
    }
}