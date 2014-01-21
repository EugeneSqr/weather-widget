
/*
 * GET home page.
 */
var indexData = {
        widget : false,
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
        },
        message : "partial test"
};

var indeces = [ 0, 1, 2, 3, 4, 5, 6 ];

exports.get = function(req, res) {
        res.render('index', indexData);
};

exports.post = function(req, res) {
        indexData.widget = true;
        indexData.host = "http://localhost:3000";
        indexData.city = req.body.city;
        indexData.days = indeces.slice(0, req.body.days_number);
        res.render('index', indexData);
        //console.log(req.body.orientation);
}
