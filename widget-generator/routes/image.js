
/*
 * GET Widget image.
 */

var redis = require("redis"),
    client = redis.createClient(null, null, { return_buffers: true });

exports.get = function(req, res){
        client.get(req.params.key, function(err, value) {
                if (err) throw new Error(err);
                res.writeHead(200, {
                        'Content-Type' : 'image/png',
                        'Content-Length' : value.length
                });

                res.end(value, 'binary');
        });
};
