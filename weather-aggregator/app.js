var parseString = require('xml2js').parseString,
    request = require('request'),
    extractor = require('./extractor.js'),
    imageBuilder = require('./imageBuilder.js'),
    Storage = require('./storage.js').Storage;

var baseUrl = 'http://export.yandex.ru/weather-ng/forecasts/';
var cities = Object.freeze( {
        Moscow: 27612,
        Nino: 27459,
        Peter: 26063
});

aggregateData(cities.Moscow);
aggregateData(cities.Nino);
aggregateData(cities.Peter);

function aggregateData(city) {
        request({ uri: buildWeatherUrl(city) }, processResponse);
}

function processResponse(error, response, body) {
        if (!error && response.statusCode == 200) {
                processServiceData(body);
        }
}

function processServiceData(data) {
        parseString(data, function (err, result) {
                var extracted = extractor.extract(result);
                if (!extracted || !extracted.days || extracted.days.length == 0) {
                        throw new Error('Extracted data is invalid');
                }
                
                var storage = new Storage(extracted.days.length);
                for(var i = 0; i < extracted.days.length; i++) {
                        var image = imageBuilder.build(extracted.days[i]);
                        if (!image) {
                                throw new Error('Failed generating widget image for ' + i + 'day');
                        }

                        var key = extracted.id + '.' + i;
                        storage.persist(key, image);
                }
        });
}

function buildWeatherUrl(city) {
        return baseUrl + city + '.xml';
}
