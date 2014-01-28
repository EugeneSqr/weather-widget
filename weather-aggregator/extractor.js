// this module is used for extracting important data from the initial set
// returned by a weather service

var max_days = 7;    // interested in one week forecast only
var day_index = 4;   // day summary element index
var night_index = 5; // night summary element index

exports.extract = function(data) {
        var extracted = {
                id: data.forecast.$.id,
                days: []
        }

        var days = data.forecast.day;
        for(var i = 0; i < max_days; i++) {
                var day = {
                        date: days[i].$.date,
                        day_time : extract_partial(days[i].day_part[day_index]),
                        night_time : extract_partial(days[i].day_part[night_index])
                }
                
                extracted.days.push(day);
        }

        return extracted;
}

function extract_partial(data) {
        return {
                temperature : data.temperature[0],
                temperature_color: data['temperature-data'][0].avg[0].$.bgcolor,
                weather_type : data.weather_type_short[0]
        }                        
}
