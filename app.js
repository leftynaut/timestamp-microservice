const express = require('express')
const path = require('path');
const favicon = require('serve-favicon');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/:date?', (req, res) => {
    const host = req.get('host');
    const path = req.path;
    res.locals.path = path;
    const date = req.params.date;
    if (!date) {
        res.render('index', { host });
    } else {
        // if date isn't a number - convert natural to unix in ms and then
        // convert to seconds - else, convert to int.
        const unix = isNaN(date) ? new Date(date).getTime() / 1000 : parseInt(date);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        };
        // sets proper formatting for natural, as defined by the sample app
        let natural = new Date(unix * 1000).toLocaleString('en-US', options);
        if (natural === "Invalid Date") {
            natural = null;
        }
        res.json({unix, natural});
    }
});

const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
