var redis = require("redis"),
    client = redis.createClient(null, null, { return_buffers: true });

var routes = function(app) {
        app.get('/', function(req, res) {
                var data = {
                        title : "Weather widget",
                        cities : [
                                { name : "Moscow", code : "27612" },
                                { name : "Nino", code : "27459" },
                                { name : "Peter", code : "26063" } ],
                        days : [ 1, 3, 7],
                        orientation : {
                                def : 1,
                                vertical : function() {
                                        return this.def;
                                },
                                horizontal : function() {
                                        return !this.def;
                                }
                        }
                };

                res.render('index', data);
        });

        app.get('/widget/:city/:days/:orient', function(req, res) {
                var model = {
                        days : [0, 1, 2, 3, 4, 5, 6].slice(0, req.params.days),
                        city : req.params.city,
                        orientation : req.params.orient
                };
                console.log(model);
                // TODO: add model validation
                app.render('partials/widget', model, function(err, html) {
                        if (err) throw new Error(err);
                        console.log(html);

                        res.send(200, html);
                });
        });

        app.get('/image/:key', function(req, res) {
                client.get(req.params.key, function(err, value) {
                        if (err) throw new Error(err);
                        
                        res.writeHead(200, {
                                'Content-Type' : 'image/png',
                                'Content-Length' : value.length
                        });

                        res.end(value, 'binary');
                });
        });
}

module.exports = routes;
