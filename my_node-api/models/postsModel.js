const mongoose = require("mongoose");

// on crée un modèle pour insérer des données dans la bd
const PostsModel = mongoose.model(
    // 1er argument : la base de donnée
    "node-api",
    // 2e argument : l'objet à insérer avec ses caractéristiques sous la forme "clé-valeur"
    {
        author: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            Default: Date.now
        }
    },
    // 3e argument : la collection (la table) dans laquelle l'objet est ajouté
    "posts"
)