'use strict'

require('dotenv').config();

const port 	= process.env.PORT,
  http 		= require('http'),
  url 		= require('url'),
  fs 		= require('fs'),
  path 		= require('path'),
  favicon 	= require('serve-favicon'),
  bodyParser = require('body-parser'),
  validUrl 	= require('valid-url'),
  mysql 	= require('mysql2'),
  Sequelize = require('sequelize'),
  models 	= require('./models'),
  uid 		= require('uniqid'),
  exphbs  	= require('express-handlebars');

var sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: process.env.DIALECT,
  port: process.env.PORT,
  host: process.env.DB_HOST,
})

const express = require('express'),
  app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/scripts', express.static(__dirname + '/node_modules/clipboard/dist/'));
app.use('/images', express.static(__dirname + '/views/images'));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// POST endpoint
app.post('/', function (req, res) {
	console.log('req.body.urlToShorten: ' + req.body.urlToShorten)
    // TODO: Do something better here.
    // validUrl validates structure but doesn't ping the url to see if it's a live site.
  if (validUrl.isUri(req.body.urlToShorten)) {
    console.log('yup may be a URI')
    let myUid = uid.time();
    models.Link.findOrCreate({
		where: {
			original: req.body.urlToShorten,
	  	},
	  	defaults: {
	  		short: myUid
	  	}
	})
	.spread((link, created) => {
		let shortylink = req.protocol + '://' + req.get('host') + req.originalUrl + 'm/' + link.get().short
	    res.status(200).render('home', {
        	shortylink: shortylink,
    	});
	})
  } else {
    console.log('Not a URI')
    res.status(500).render('home', {
    	derp: 'That doesn\'t look like a valid uri, please try again.',
    });
  }
})

// j - check out uuid/v4 for short urls
app.get('/m/:short', function(req, res, next){
	console.log('req.params.short ' + req.params.short + '/' + uid.time())
	models.Link.findOne({
		where: {
	    short: req.params.short
	  }
	})
	.then(links => {
	  res.set('location', links.original)
	  res.status(301).send()
	})
})

// GET endpoint
app.get('/', function (req, res, next) {
  console.log('Got a GET request for the homepage')
  res.render('home');
  // res.sendFile('index.html');
})

app.listen(process.env.PORT || port)
console.log('Express server listening on port %d in %s mode', port, app.settings.env)



// close connection
// connection.end()
