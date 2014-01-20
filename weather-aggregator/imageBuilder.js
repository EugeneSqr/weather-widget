// The module builds widget image for a single day based on data
// retrieved from a weather service
var Canvas = require('canvas'),
    canvas = new Canvas(150, 45),
    ctx = canvas.getContext('2d');

var day_label = "День:",
    night_label = "Ночь:"

exports.build = function(day_data) {
        // Header
        ctx.font = 'bold 12px Impact';
        ctx.fillText(day_data.date, 3, 12);
        draw_horizontal_line(ctx, 3, 147, 15);
        // Day
        fill_data(ctx, day_label, day_data.day_time, 28);
        // Night
        fill_data(ctx, night_label, day_data.night_time, 41);

        return canvas.toBuffer();
}

function fill_data(context, label, data, vertical_offset) {
        var text = label + ' ' + data.temperature + ', ' + data.weather_type;
        context.font = 'normal 10px Impact';
        context.fillText(text, 3, vertical_offset);
}

function draw_horizontal_line(context, start, end, vertical_offset) {
        context.beginPath();
        context.moveTo(start, vertical_offset);
        context.lineTo(end, vertical_offset);
        context.stroke();
}
