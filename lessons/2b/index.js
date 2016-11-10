var lesson = function (req) {
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

    console.log('Полное имя: "' + fullname + '", результат: "' + result.join(' ') + '".');
    return result.join(' ');
};

module.exports = lesson;