var parseString = require('xml2js').parseString,
    request = require('request'),
    extractor = require('./extractor.js'),
    imageBuilder = require('./imageBuilder.js'),
    storage = require('./storage.js');

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
                                if (!extracted || !extracted.days || extracted.days.length == 0) {
                                        throw new Error('Extracted data is invalid');
                                }
                                
                                storage.init(extracted.days.length);
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
        });

function buildWeatherUrl(city) {
        return baseUrl + city + '.xml';
}
