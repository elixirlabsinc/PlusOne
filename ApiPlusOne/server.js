const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true });

const ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("API Plus One listening on PORT", PORT);
});
