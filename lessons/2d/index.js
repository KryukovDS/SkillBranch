/**
 * Краткое описание задачи
 *
 * Распознать цвет и привести его к #abcdef виду
 *
 * Полное описание задачи
 *
 * Довольно часто, разработчиком приходится работать с цветами. Существуем множество
 * цветовых систем и форматов их записи.
 *
 * Клиент выполняет GET запрос с параметром Query: ?color= и присылает цвета в разных форматах.
 *
 * Задача: привести все цвета к виду HEX виду в нижнем регистре: #123abc.
 *
 * В случае если в color находится
 * некорректный цвет, Invalid color
 *
 * Подробнее про цвета и способы их представления
 * можно почитать тут: http://www.w3schools.com/colors/colors_picker.asp
 */

var colors = require('colors/safe');
var convert = require('color-convert');
var querystring = require('querystring');

var Lesson = function () {
    this.url = '';
    this.handler = function (req, res, url) {
        var result, query, trim, match, fields, replace;

        query = req.query.hasOwnProperty('color') ? req.query['color'] : '';
        trim = querystring.unescape(query).trim();

        var hex = /^(?:#)?([\da-f]{3}|[\da-f]{6})$/i;
        var rgb = /^rgb\([\s]*(\d+)[\s,]+(\d+)[\s,]+(\d+)[\s]*\)$/i;
        var hsl = /^hsl\([\s]*(\d+)[\s,]+(\d+%)[\s,]+(\d+%)[\s]*\)$/i;

        if (trim.length) {
            if (hex.test(trim)) {
                replace = /^(?:#)?(([\da-f])|([\da-f]{2}))(([\da-f])|([\da-f]{2}))(([\da-f])|([\da-f]{2}))$/i;
                result = trim.replace(replace, '$2$2$3$5$5$6$8$8$9');
            } else if (rgb.test(trim)) {
                match = rgb.exec(trim);

                fields = [];
                for (let $i = 1; $i <= 3; $i++) {
                    let field = parseInt(match[$i]);
                    if (field >= 0 && field <= 255) {
                        field.length === 1 && (field = field.concat(field));
                        fields.push(field);
                    }
                }

                if (fields.length === 3) {
                    result = convert.rgb.hex(fields[0], fields[1], fields[2]);
                }
            } else if (hsl.test(trim)) {
                match = hsl.exec(trim);

                fields = [];
                for (let $i = 1; $i <= 3; $i++) {
                    let field = parseInt(match[$i]);
                    if (($i === 1 && field >= 0 && field <= 255) || ($i > 1 && field >= 0 && field <= 100)) {
                        field.length === 1 && (field = field.concat(field));
                        fields.push(field);
                    }
                }

                if (fields.length === 3) {
                    result = convert.hsl.hex(fields[0], fields[1], fields[2]);
                }
            }
        }

        result = result ? '#' + result.toLowerCase() : 'Invalid color';

        /*
        // Вручную могу только до rgb =(
        // Остальное через color-convert
        if (trim.length) {
            if (/^(?:#)?([\da-f]{3}){1,2}$/i.test(trim)) {
                replace = /^(?:#)?(([\da-f])|([\da-f]{2}))(([\da-f])|([\da-f]{2}))(([\da-f])|([\da-f]{2}))$/i;
                result = trim.replace(replace, '#$2$2$3$5$5$6$8$8$9').toLowerCase();
            } else if (/^rgb\([\s]*(\d+)[\s,]+(\d+)[\s,]+(\d+)[\s]*\)$/i.test(trim)) {
                match = /^rgb\([\s]*(\d+)[\s,]+(\d+)[\s,]+(\d+)[\s]*\)$/i.exec(trim);

                elements = [];
                for (var $i = 1; $i <= 3; $i++) {
                    if (match[$i] >= 0 && match[$i] <= 255) {
                        var rgb = Number(match[$i]).toString(16);
                        rgb.length === 1 && (rgb = rgb.concat(rgb));
                        elements.push(rgb);
                    }
                }

                if (elements.length === 3) {
                    result = '#' + elements.join('');
                }
            }
        }
        */


        console.log('Запрос: "' + colors.green(query) + '", результат: "' + colors.green(result) + '".');
        res.status(200).send(result.toString());
    };
};

module.exports = new Lesson();