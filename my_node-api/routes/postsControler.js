// on peut aussi nommer le dossier 'routes' sous l'appelation 'controllers' pour refléter l'architecture MVC
// mais dans cette appli nous n'auront pas de Vue, uniquement un modèle et des controleurs ou routes (chemins d'accès)

const express = require("express");
const router = express.Router();

// on appelle le modèle du fichier PostsModel.js et que l'on a rendu accessible avec la commande export
const { PostsModel } = require('../models/postsModel');

// ici le '/' correspond à ce qui se trouve à la suite de l'adresse définie dans le fichier index.js, en l'occurence ici '/posts'
router.get('/', (req, res) => {
    PostsModel.find((err, docs) => {
        if (err) console.log('Connection error' + err);
        // on envoie docs dans le navigateur avec la méthode res.send() - ici 'res' est la réponse (on ne fait rien de la requête (req))
        res.send(docs);
    })
});

router.post('/', (req, res) => {
    // ici PostsModel est un objet créé précédemment par la méthode mongoose.model() et qui permet d'insérer des données au format json dans la bd avec la méthode save()
    const newRecord = new PostsModel ({
        // c'est ici la méthode de bodyParser qui est appelée sur req
        author: req.body.author,
        message: req.body.message
    });

    newRecord.save((err, docs) => {
        if(err) console.log('Error creating new data... ' +err);
        res.send(docs);
    })
});


module.exports = router;