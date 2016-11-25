var express          = require( 'express' )
  , app              = express()
  , cors             = require('cors')
  , server           = require( 'http' ).createServer( app ) 
  , util             = require( 'util' )
  //, jwt              = require('express-jwt')
  , bodyParser       = require( 'body-parser' )
  , cookieParser     = require( 'cookie-parser' );

// API Access link for creating client ID and secret:
// https://code.google.com/apis/console/
var APP_PORT = 2112;


// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/'));
app.use( cookieParser()); 
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
	extended: true
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors());

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('*', function(req, res){
  res.render('index')
});

server.listen( APP_PORT, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server is listen on" + host + ':' + port)
});

