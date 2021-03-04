// on peut aussi nommer le dossier 'routes' sous l'appelation 'controllers' pour refléter l'architecture MVC
// mais dans cette appli nous n'auront pas de Vue, uniquement un modèle et des controleurs ou routes (chemins d'accès)

const express = require("express");
const router = express.Router();

// pour récupérer la propriété d'un objet dans la db
const ObjectID = require('mongoose').Types.ObjectId;

// on appelle le modèle du fichier PostsModel.js et que l'on a rendu accessible avec la commande export
const { PostsModel } = require('../models/postsModel');

// ======================= METHODE GET ====================== //
// ici le '/' correspond à ce qui se trouve à la suite de l'adresse définie dans le fichier index.js, en l'occurence ici '/posts'
router.get('/', (req, res) => {
    PostsModel.find((err, docs) => {
        if (err) console.log('Connection error' + err);
        // on envoie docs dans le navigateur avec la méthode res.send() - ici 'res' est la réponse (on ne fait rien de la requête (req))
        res.send(docs);
    })
});

// ======================= METHODE POST ====================== //
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

// =================== METHODE PUT (UPDATE) =================== //
router.put('/:id', (req, res) => {
    // vérifie si l'id reçue dans la réponse existe dans la bd avec la méthode isValid() de mongoose
    if(!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    }

    const updateRecord = {
        author: req.body.author,
        message: req.body.message
    };

    PostsModel.findByIdAndUpdate(
        req.params.id,
        // pour introduire les nouvelles données
        { $set: updateRecord },
        // retourne le document mis à jour plutôt que tel qu'avant le changement (comportement par défaut)
        { new: true },
        (err, docs) => {
            if(err) throw err;
            res.send(docs);
        }
    );
});




module.exports = router;