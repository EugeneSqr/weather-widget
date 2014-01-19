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
                var day_time = days[i].day_part[day_index];
                var night_time = days[i].day_part[night_index];

                var day = {
                        date: days[i].$.date,
                        day_time : {
                                temperature: day_time.temperature[0],
                                weather_type: day_time.weather_type_short[0]
                        },
                        night_time : {
                                temperature: day_time.temperature[0],
                                weather_type: day_time.weather_type_short[0]
                        }
                }
                
                extracted.days.push(day);
        }

        return extracted;
}
