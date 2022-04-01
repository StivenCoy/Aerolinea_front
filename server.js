const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/aerolinea'));

app.get('/*', (req, res) => 
    res.sendFile('index.html', { root: 'dist/aerolinea/' })
);

app.listen(process.env.PORT || 8080);