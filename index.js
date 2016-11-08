var express = require('express');
var app = express();

app.get('/', function(req, res) {
    const a = req.query.hasOwnProperty('a') ? parseFloat(req.query['a']) || 0 : 0;
    const b = req.query.hasOwnProperty('b') ? parseFloat(req.query['b']) || 0 : 0;
    const result = a + b;

    res.send('Ваши рабы посчитали сумму чисел a(' + a + ') и b(' + b + '), она составляет: ' + result + ', хозяин!');
});

app.listen(3000, function () {
    console.log('Слушаю порт 3000, хозяин!');
});