'use strict';

var express = require('express')

var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/:date?', function(req, res) {
    var path = req.path;
    res.locals.path = path;
    var date = req.params.date;
    if (date == undefined) {
    res.render('index');
    } else {
        if (!isNaN(date)) {  // if date is a number...
            var unix = parseInt(date);  // then convert to an integer and set to var unix
        } else {
            var unix = (new Date(date).getTime() / 1000) - 28800  // converts natural language to unix in ms, converts to seconds, then subtracts 8 hrs
        }

        var options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };  // sets proper formatting for natural, as defined by the sample app
        var natural = new Date(unix * 1000).toLocaleString('en-US', options);
        if (natural === "Invalid Date") {
            natural = null;
        }
        res.json({ unix: unix, natural: natural });
    }
});

app.listen(process.env.PORT, function() {
    console.log("Timestamp server running");
});