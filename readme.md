# Bitly clone

A nifty little tool to turn long, ugly urls into something shorter and sweeter.

## Under the hood
* Built with nodejs, mysql db and sequelize migrations
* Front end built with bootstrap and handlebars
* leverages npm uniqid for shortified uris

## Basic usage

* add valid uri using protocol prefix
* submit
* get shoritfied uri
* click to copy
* paste to anywhere and enjoy

## Install and run

1. npm install
2. cp config/config-sample.json config/config.json
3. add/update creds to config/config.json
4. cp .env-sample .env
5. add/update creds to .env
6. run $ node_modules/.bin/sequelize db:migrate
7. run $ node_modules/.bin/sequelize db:seed:all
8. run locally with nodemon in dev env with npm run nodemon