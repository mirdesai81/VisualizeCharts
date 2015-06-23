/**
 * Created by Mihir.Desai on 5/6/2015.
 */

module.exports = function(app){

    app.get("/partials/*", function(req, res){
        console.log(req.params[0]);
        res.render('../../public/app/'+req.params[0]);
    });



    app.get('*', function(req, res){
        res.render('index');
    });
};

