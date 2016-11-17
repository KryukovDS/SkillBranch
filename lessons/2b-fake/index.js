var fake = {
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

var Lesson = function () {
    this.url = '';
    this.handler = function (req, res, url) {
        var result = fake[req.query['fullname']] || "Invalid fullname";
        console.log('Полное имя: "' + (req.query['fullname'] || '') + '", результат: "' + result + '".');
        res.status(200).send(result.toString());
    };
};

module.exports = new Lesson();