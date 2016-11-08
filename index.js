var express = require('express');
var cors = require('cors');

var app = express();
var port = 3000;

app.use(cors());
app.listen(port, function () {
    console.log('Слушаю порт ' + port + ', хозяин!');
});

app.all('/2b/', function(req, res) {
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
    res.send(result.join(' '));
});

