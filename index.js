var express = require('express');
var app = express();
var port = 80;

app.get('/', function(req, res) {
    var result = [];
    var fullname = req.query.hasOwnProperty('fullname') ? req.query['fullname'] : '';
    var initials = fullname.split(' ');
    
    if (initials.length && initials.length <= 3) {
        initials.length && result.push(initials.pop());
        initials.length && result.push(initials.shift().substr(0, 1) + '.');
        initials.length && result.push(initials.pop().substr(0, 1) + '.');
    }
    
    result.length === 0 && result.push('Invalid fullname');

    console.log('Full name: "' + fullname + '", result: "' + result.join(' ') + '".');
    res.send(result.join(' '));
});

app.listen(port, function () {
    console.log('Слушаю порт ' + port + ', хозяин!');
});