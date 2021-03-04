const express = require('express');
const app = express();
require("./models/dbConfig");

// on accède au controlleur rendu accessible à l'import avec la méthode module.exports
const postsRoutes = require('./routes/postsControler');
const bodyParser = require('body-parser');

// bodyParser.json() : on appelle avec la méthode 'use()' un middleware pour 'parser' le corps des requêtes au format JSON et les rendres accessibles via la méthode req.body
app.use(bodyParser.json());

// middleware qui appelle le second paramètre en fonction du premier. C'est du routage. Ici il nous envoie vers postsRoutes, càd './routes/postsControler'
// on configure en fait ici ce qui sera considéré comme la racine de notre routeur appelé en second paramètre
app.use('/posts', postsRoutes);

app.listen(5500, () => console.log('Server started : 5500'));