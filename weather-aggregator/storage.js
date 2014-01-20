var redis = require("redis"), 
    client = redis.createClient();

client.on("error", function (err) {
        client.quit();
        throw new Error('Error ' + err);
});

var items_left = 0;
exports.init = function(length) {
        items_left = length;
}

exports.persist = function(key, value) {
        client.set(key, value, function() {
                console.log('data for ' + key + ' is persisted');
                items_left--;
                if (items_left == 0) {
                        console.log('all data saved.');
                        client.quit();
                }
        });
}
