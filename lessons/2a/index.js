var Lesson = function () {
    this.url = '*';
    this.handler = function (req, res, url) {
        var a = req.query.hasOwnProperty('a') ? parseFloat(req.query['a']) || 0 : 0;
        var b = req.query.hasOwnProperty('b') ? parseFloat(req.query['b']) || 0 : 0;
        var result = a + b;

        console.log('Ваши рабы посчитали сумму чисел a(' + a + ') и b(' + b + '), она составляет: ' + result + ', хозяин!');
        res.status(200).send(result.toString());
    };
};

module.exports = new Lesson();