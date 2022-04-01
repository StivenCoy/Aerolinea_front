const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/aerolinea_front/'));

app.get('/*', (req, res) => 
    res.sendFile('index.html', { root: 'dist/aerolinea_front/' })
);

app.listen(process.env.PORT || 8080);