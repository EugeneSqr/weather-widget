var redis = require("redis");

exports.Storage = function(length) {
        var self = this;

        self.client = getClient();
        self.length = length;
        self.persist = function(key, value) {
                self.client.set(key, value, function() {
                        console.log('data for ' + key + ' is persisted');
                        self.length--;
                        if (self.length == 0) {
                                console.log('all data saved.');
                                self.client.quit();
                        }
                });
        }
}

function getClient() {
        var client = redis.createClient();

        client.on("error", function (err) {
                this.quit();
                throw new Error('Error ' + err);
        });

        return client;
}
