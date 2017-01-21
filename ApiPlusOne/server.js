const ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;

const config = require('./config.js')(ENV);

const express = require('express');
const app = express();

const mysql = require('mysql');

if (ENV == 'development') {
	const sqlite3 = require('sqlite3').verbose();
	var connection = new sqlite3.Database('plusone.db');
} else {
	var connection = mysql.createConnection({
		'host': config.HOST,
		'user': config.USER,
		'password': config.PASSWORD,
		'database': config.DATABASE,
		'multipleStatements': true
	});
}

const nodeSql = require('nodesql');
const db = nodeSql.createMySqlStrategy(connection);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));

app.set('router', express.Router());
app.set('db', db);

app.listen(PORT, () => {
	console.log('API Plus One listening on PORT', PORT);
});
