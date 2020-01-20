var http = require('http');
var express = require('express')
var fs = require('fs'); // lecture de fichier
var moduleCalculatrice = require("./moduleCalculatrice");
// var url = require('url');
var dossierFichiers = 'templates';
var bodyParser = require('body-parser');
var constructPath = require('./constructPath');

app = express();
app.use(express.static(__dirname + '/public')); // dossier des fichier statics
app.use(bodyParser.json()); // fonction qui va lire les variables en POST
app.use(bodyParser.urlencoded({ extended: true}));

app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/' + dossierFichiers);
app.set('view engine', 'ejs');
 
app.locals.nav = constructPath.searchFilesFormPath(dossierFichiers);

app.get(['/','/home'], function (req, res) {    

    fs.writeFile("home.txt", "Coucou les gens!", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    fs.readFile("home.txt", "utf8", function (err, article) {
        res.render('home', { title: 'Home', message: 'Coucou', people: 'Titi', article: article});
    });
});

app.get('/cv', function (req, res) {

    fs.readFile("CV/cv.html", "utf8", function (err, data) {
        res.end(data);
    });

});

app.get('/sourceUrl', function (req, res) {

    http.get("http://artscene.textfiles.com/asciiart/LOGOS/flt1.txt", function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d + '<br>';
        });
        response.on('end', function () {
            res.render('sourceUrl', {title: 'sourceUrl', body : body});
        });
    })

});

app.post('/calcResult', function (req, res) {

   // var url_parts = url.parse(req.url, true);
    // var a = parseInt(url_parts.query.a);
    // var b = parseInt(url_parts.query.b);
    // var operateur = url_parts.query.operateur;
    // var resultat = '';

    console.log('a : ' + req.body.a);
    console.log('b : ' + req.body.b);
    console.log('operateur : ' + req.body.operateur);

    var a = parseInt(req.body.a);
    var b = parseInt(req.body.b);
    var operateur = req.body.operateur;
    var resultat = '';
    
        if ( a && b && operateur) {
        console.log("Entre dans switch, operateur = " + operateur + " !\n");
        switch (operateur) {

            case "add":
                resultat = moduleCalculatrice.add(a, b);
                break;
            case "sub":
                resultat = moduleCalculatrice.sub(a, b);
                break;
            case "div":
                resultat = moduleCalculatrice.div(a, b);
                break;
            case "mult":
                resultat = moduleCalculatrice.mult(a, b);
                break;
        }
        res.render('calculatrice', {title: 'Calculatrice', resultat : resultat});

    } else {
        res.render('calculatrice', {title: 'Calculatrice', resultat : "Veuillez choisir 2 chiffres a et b"});
    }

});

app.get('/calculatrice', function (req, res) {
        res.render('calculatrice', {title: 'Calculatrice', resultat : "Veuillez choisir 2 chiffres a et b"});
});

app.listen(8888, '127.0.0.1');
console.log('server running at http://127.0.0.1:8888');