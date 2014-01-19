var parseString = require('xml2js').parseString;
var request = require('request');
var extractor = require('./extractor.js');

var baseUrl = 'http://export.yandex.ru/weather-ng/forecasts/';
var cities = Object.freeze( {
        Moscow: 27612,
        Nino: 27459,
        Peter: 26063
});

request({ uri: buildWeatherUrl(cities.Nino) },
        function (error, response, body) {
                if (!error && response.statusCode == 200) {
                        parseString(body, function (err, result) {
                                var extracted = extractor.extract(result);
                                console.dir(extracted);
                        });
                }
        });

function buildWeatherUrl(city) {
        return baseUrl + city + '.xml';
}
