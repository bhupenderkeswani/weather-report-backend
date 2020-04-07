const express = require('express');
const app = express();
const cors = require('cors');
const port = 3030;

// config
const yahooWeatherAPIUrl = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
const clientID = '{clientID}';
const clientSecretKey = '{clientKey}';
const appName = '{appName}';
// config

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

app.get('/getUSCities', (request, response) => {
    response.json(['New York', 'New Jersi']);
});

app.post('/getForcastFor',  async (request, response) => {
    const city = "New York, NY";
    console.log(request.body);

    const OAuth = require('oauth');
    const header = {
        "X-Yahoo-App-Id": appName
    };
    const requestYahoo = new OAuth.OAuth(
        null,
        null,
        clientID,
        clientSecretKey,
        '1.0',
        null,
        'HMAC-SHA1',
        null,
        header
    );
    requestYahoo.get(
        `${yahooWeatherAPIUrl}?location=${city}&u=c&format=json`,
        null,
        null,
        function (err, data, result) {
            if (err) {
                response.json(err);
            } else {
                response.end(data);
            }
        }
    );
    // response.json(forcast);
});