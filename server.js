const express = require('express');

const app = express();

app.use(express.static(__dirname + `/dist/plasma`));

app.get('/*', (req, res) => res.sendFile(__dirname + `/dist/plasma/index.html`));

app.listen(process.env.PORT || 8080)
