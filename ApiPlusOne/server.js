const ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;

const config = require('./config.js')(ENV);
const rest = require("./rest.js");

const express = require('express');
var app = express();

const mysql = require('mysql');
const nodeSql = require('nodesql');

const bodyParser = require('body-parser');
const md5 = require('MD5')


function REST(){
	var self = this;
	self.connectMysql();
}

REST.prototype.connectMysql = function() {
	var self = this;
	if (ENV == 'development') {
		const sqlite3 = require('sqlite3').verbose();
		var connection = new sqlite3.Database('plusone.db');
		var db = nodeSql.createSqliteStrategy(connection);
	} else {
		var connection = mysql.createConnection({
			'host': config.HOST,
			'user': config.USER,
			'password': config.PASSWORD,
			'database': config.DATABASE,
			'multipleStatements': true
		});
		var db = nodeSql.createMySqlStrategy(connection);
	}
	require('./create.tables.js')(db);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ 'extended': true }));
	var router = express.Router();
	app.set('db', db);
	app.set('router', router);
	app.use('/',router);
	var rest_router = new rest(router,connection,md5);
	self.startServer();
}

REST.prototype.startServer = function () {
	app.listen(PORT, () => {
		console.log('API Plus One listening on PORT', PORT);
	});
}

REST.prototype.stop = function (err) {
	console.log("ISSUE WITH MYSQL n" + err)
	process.exit(1);
}

new REST();