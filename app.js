'use strict';

var express = require('express')

var path = require('path');
var favicon = require('serve-favicon');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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
            var unix = (new Date(date).getTime() / 1000)  // converts natural language to unix in ms and converts to seconds
        }

        var options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };  // sets proper formatting for natural, as defined by the sample app
        var natural = new Date(unix * 1000).toLocaleString('en-US', options);
        if (natural === "Invalid Date") {
            natural = null;
        }
        res.json({ unix: unix, natural: natural });
    }
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
   console.log('Sever listening on port ' + port);
});
