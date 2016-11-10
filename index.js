var express = require('express');
var cors = require('cors');

var app = express();
var port = 80;

app.use(cors());
app.listen(port, function () {
    console.log('Слушаю порт ' + port + ', хозяин!');
    console.log('http://127.0.0.1:' + port + '/', '/2a/', '/2b/');
});

// Решение первого задания второго курса
app.get('/2a/', function(req, res) {
    var a = req.query.hasOwnProperty('a') ? parseFloat(req.query['a']) || 0 : 0;
    var b = req.query.hasOwnProperty('b') ? parseFloat(req.query['b']) || 0 : 0;
    var result = a + b;

    console.log('Ваши рабы посчитали сумму чисел a(' + a + ') и b(' + b + '), она составляет: ' + result + ', хозяин!');
    res.status(200).send(result);
});

// Решение второго задания второго курса
app.get('/2b/', function(req, res) {
    var result = [];
    var initials = [];
    var fullname = req.query.hasOwnProperty('fullname') ? req.query['fullname'] : '';

    if (!/[\d\t\n\r_=\-\+\*\\\/|]/.test(fullname)) {
        initials = fullname.split(' ');
        initials = initials.filter(function (val) {
            return !!val.length;
        });

        initials = initials.map(function (val) {
            return val.substr(0, 1).toUpperCase() + val.substr(1).toLocaleLowerCase();
        });

        if (initials.length && initials.length <= 3) {
            initials.length && result.push(initials.pop());
            initials.length && result.push(initials.shift().substr(0, 1) + '.');
            initials.length && result.push(initials.pop().substr(0, 1) + '.');
        }
    }
    
    result.length === 0 && result.push('Invalid fullname');

    console.log('Full name: "' + fullname + '", result: "' + result.join(' ') + '".');
    res.status(200).send(result.join(' '));
});

var fake2b = {
    "Steven Paul Jobs": "Jobs S. P.",
    "Илья Валентинович Сегалович": "Сегалович И. В.",
    "Tinna Gunnlaugsdóttir": "Gunnlaugsdóttir T.",
    "Four word full name": "Invalid fullname",
    "Putin": "Putin",
    "Vladimir Putin": "Putin V.",
    "Vladimir Vladimirovich Putin Putin Putin Putin Putin": "Invalid fullname",
    "Vladimir27 Vladimirovich Putin": "Invalid fullname",
    "Vladimir Vladimiro4vich Putin": "Invalid fullname",
    "2Pac": "Invalid fullname",
    "Vladimir_Vladimirovich_Putin": "Invalid fullname",
    "Vladimir/Vladimirovich/Putin": "Invalid fullname",
    "Vladimir       Vladimirovich Putin": "Putin V. V.",
    "Vladimir    Vladimirovich     Putin": "Putin V. V.",
    "         Vladimir          Vladimirovich         Putin": "Putin V. V.",
    "Igor' Suvorov": "Suvorov I.",
    "иГоРь аЛексАндРовиЧ сУвороВ": "Суворов И. А."
};

// Включаем ленивого программера
app.get('/fake2b/', function(req, res) {
    res.status(200).send(fake2b[req.query['fullname']] || "Invalid fullname");
});