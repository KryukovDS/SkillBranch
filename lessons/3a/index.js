/**
 * Краткое описание задачи
 *
 * Реализовать Express.js приложение по работе с API, обработка GET запросов для получения данных
 *
 * Полное описание задачи
 *
 * У вас есть объект, который описывает структуру персонального компьютера на базе процессора 80286.
 * Необходимо реализовать геттеры внутренних подструктур и свойст этой модели. Ответ должен быть всегда
 * валидным JSON, например при отдаче строки, она должна быть в двойных кавычках (смотрите примеры).
 * В случае ошибки запроса подструктуры которой нет в модели, необходимо возвращать 404 код ошибки,
 * с телом "Not Found". Нумерация массивов начинается с 0. Дополнительно необходимо реализовать
 * метод /volumes, который подсчитывает, сколько места на каком диске находится, подробности
 * можно увидеть в примерах.
 */

var colors = require('colors/safe');
var data = {
    "board": {
        "vendor": "IBM",
        "model": "IBM-PC S-100",
        "cpu": {"model": "80286", "hz": 12000},
        "image": "http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg",
        "video": "http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"
    },
    "ram": {"vendor": "CTS", "volume": 1048576, "pins": 30},
    "os": "MS-DOS 1.25",
    "floppy": 0,
    "hdd": [
        {"vendor": "Samsung", "size": 33554432, "volume": "C:"},
        {"vendor": "Maxtor", "size": 16777216, "volume": "D:"},
        {"vendor": "Maxtor", "size": 8388608, "volume": "C:"}
    ],
    "monitor": null,
    "length": 42,
    "height": 21,
    "width": 54
};

var Lesson = function () {
    this.url = '*';
    this.handler = function (req, res, url) {
        var query;
        var result;

        query = req.params[0].split('/').filter(function (value) {
            return !!value;
        });

        if (query.length === 1 && query[0] === 'volumes') {
            result = {};
            data.hdd.forEach(function (hdd) {
                result[hdd.volume] = hdd.size + parseFloat((result[hdd.volume] || 0).toString().replace(/[^\d]/g, '')) + 'B';
            });
        } else {
            result = data;
            query.forEach(function (field) {
                switch (Object.prototype.toString.call(result)) {
                    case '[object Array]':
                    case '[object Object]': {
                        result = Object.keys(result).indexOf(field) >= 0 ? result[field] : undefined;
                        break;
                    }
                    default: result = undefined;
                }
            });
        }

        console.log('Запрос: "' + colors.green(req.params[0]) + '", результат: "' + colors.green(JSON.stringify(result)) + '".');

        if (result === undefined) {
            res.status(404).send('Not Found');
            return;
        }

        res.json(result);
    };
};

module.exports = new Lesson();
