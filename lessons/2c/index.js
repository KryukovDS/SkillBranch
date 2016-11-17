/**
 * Краткое описание задачи
 *
 * Верезать из строки вида `telegram.me/skillbranch` username `skillbranch`
 *
 * Полное описание задачи
 *
 * Многие сервисы, такие как ВК, Twitter, Telegram позволяют занимать унивальные имена пользователей.
 * Очень часто пользователи заполняя формы на сайте, вставляют не стандартные ссылки на свои профили в соц.сетях.
 * Клиент выполняет GET запрос с параметром Query: ?username в разных форматах.
 * Задача: привести все ссылки к единому формату, а именно к виду @username.
 * В случае если в url находится некорретная строка, необходимо вывести Invalid username
 */

var colors = require('colors/safe');
var Lesson = function () {
    this.url = '';
    this.handler = function (req, res, url) {
        var result, query;

        query = req.query.hasOwnProperty('username') ? req.query['username'] : '';
        result = query.replace(/^(?:[^:]*:)?(?:\/{2})?(?:[^\/]*(?=\/))?\/?@?([^\/\?#]*).*/, '@$1');

        console.log('Запрос: "' + colors.green(query) + '", результат: "' + colors.green(result) + '".');
        res.status(200).send(result.toString());
    };
};

module.exports = new Lesson();