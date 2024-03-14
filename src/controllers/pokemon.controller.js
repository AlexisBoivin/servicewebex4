<<<<<<< HEAD
// À ajuster selon la structure
const Pokemon = require("../models/pokemon.model");


exports.trouverUnPokemon = (req, res) => {
    // Teste si le paramètre id est présent et valide
    if(!req.params.id || parseInt(req.params.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id du pokemon est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    // Appel à la fonction trouverUnProfesseur dans le modèle
    Pokemon.trouverUnPokemon(req.params.id)
    // Si c'est un succès
    .then((pokemon) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        console.log(pokemon);
        if (!pokemon[0]) {
            res.status(404);
            res.send({
                message: `Pokemon introuvable avec l'id ${req.params.id}`
            });
            return;
        }
        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un pokemon par id
        // res.send c'est ce qu'on retourne à l'utilisateur.
        res.send(pokemon[0]);
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération du pokemon avec l'id " + req.params.id
        });
    });
};


exports.AfficherListePaginer = (req,res) => {
    if(!req.query.page){
        req.query.page = 1;
    }
    // NOTE : Si on ne reçoit pas de type, on doit retourner tous les pokémons
    Pokemon.AfficherListePaginer(req.query.type)

    .then((pokemon) => {
    if (!pokemon[0]) {
        res.status(404);
        res.send({
            message: `Aucun pokémon de type ${req.query.type}`
        });
        return;
    }
    // NOTE : Le format de la réponse est incorrect
    res.send(pokemon.slice(req.query.page * 25 - 25, req.query.page * 25));
        
    })


    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération des pokémon de type " + req.params.id
        });
    });
};


exports.ajouterPokemon = (req,res) => {
    // NOTE : ici le reste du code devrait être dans la réponse de la promesse (then). Sinon le code va continuer à s'exécuter et n'attendra pas la réponse de la promesse.
    // NOTE : Si trouverUnPokemon retourne quelque chose, ne pas ajouter le pokémon
    var lepokemon = Pokemon.trouverUnPokemon(req.params.id)
    // NOTE : Tu devrais valider que les champs obligatoires sont présents
    Pokemon.ajouterPokemon(req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense)
    
    .then((pokemon) => {
    
    res.send({
        message : "Le pokemon"+ req.body.nom +"a été ajouté avec succès",
        // TODO : tu ne devrais pas utiliser la variable lepokemon ici, tu peux reprendre ce que tu as dans le body plus le id créé.
        pokemon : {
            id : pokemon.insertid, // TODO : Le insertid doit être dans le model (voir commentaire)
            nom: lepokemon.nom,
            type_primaire: lepokemon.type_primaire,
            type_secondaire: lepokemon.type_secondaire,
            pv: lepokemon.pv,
            attaque: lepokemon.attaque,
            defense: lepokemon.defense
        }

    });
        
    })


    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la création d'un nouveau Pokémon. "
        });
    });
};

exports.modifierPokemon = (req,res) => {
    // NOTE : Tu devrais valider que les champs obligatoires sont présents
    // NOTE : Valide aussi que le poekmon existe
    Pokemon.modifierPokemon(req.params.id, req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense)
    
    .then(() => {
    
    res.send({
        message : "Le pokemon"+ req.params.id +" a été modifié avec succès",

        pokemon : {
            id : req.params.id,
            nom: req.body.nom,
            type_primaire: req.body.type_primaire,
            type_secondaire: req.body.type_secondaire,
            pv: req.body.pv,
            attaque: req.body.attaque,
            defense: req.body.defense
        }

    });
        
    })


    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la modification du Pokémon. "
        });
    });
};

exports.supprimerPokemon = (req,res) => {
    // NOTE : Valide que le poekmon existe
    Pokemon.supprimerPokemon(req.params.id)
    
    .then(() => {
    
    res.send({
        message : "Le pokemon "+ req.params.id +" a été supprimé avec succès",

        pokemon : {
            id : req.params.id,
            nom: req.body.nom,
            type_primaire: req.body.type_primaire,
            type_secondaire: req.body.type_secondaire,
            pv: req.body.pv,
            attaque: req.body.attaque,
            defense: req.body.defense
        }

    });
        
    })


    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la modification du Pokémon. "
        });
    });
=======
// À ajuster selon la structure
const Pokemon = require("../models/pokemon.model");


exports.trouverUnPokemon = (req, res) => {
    // Teste si le paramètre id est présent et valide
    if(!req.params.id || parseInt(req.params.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id du pokemon est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    // Appel à la fonction trouverUnProfesseur dans le modèle
    Pokemon.trouverUnPokemon(req.params.id)
    // Si c'est un succès
    .then((pokemon) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        console.log(pokemon);
        if (!pokemon[0]) {
            res.status(404);
            res.send({
                message: `Pokemon introuvable avec l'id ${req.params.id}`
            });
            return;
        }
        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un pokemon par id
        // res.send c'est ce qu'on retourne à l'utilisateur.
        res.send(pokemon[0]);
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération du pokemon avec l'id " + req.params.id
        });
    });
};


exports.AfficherListePaginer = (req,res) => {
    if(!req.query.page){
        req.query.page = 1;
    }
    // NOTE : Si on ne reçoit pas de type, on doit retourner tous les pokémons
    Pokemon.AfficherListePaginer(req.query.type)

    .then((pokemon) => {
    if (!pokemon[0]) {
        res.status(404);
        res.send({
            message: `Aucun pokémon de type ${req.query.type}`
        });
        return;
    }
    // NOTE : Le format de la réponse est incorrect
    res.send(pokemon.slice(req.query.page * 25 - 25, req.query.page * 25));
        
    })


    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération des pokémon de type " + req.params.id
        });
    });
};


exports.ajouterPokemon = (req,res) => {
    // NOTE : ici le reste du code devrait être dans la réponse de la promesse (then). Sinon le code va continuer à s'exécuter et n'attendra pas la réponse de la promesse.
    // NOTE : Si trouverUnPokemon retourne quelque chose, ne pas ajouter le pokémon
    var lepokemon = Pokemon.trouverUnPokemon(req.params.id)
    // NOTE : Tu devrais valider que les champs obligatoires sont présents
    Pokemon.ajouterPokemon(req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense)
    
    .then((pokemon) => {
    
    res.send({
        message : "Le pokemon"+ req.body.nom +"a été ajouté avec succès",
        // TODO : tu ne devrais pas utiliser la variable lepokemon ici, tu peux reprendre ce que tu as dans le body plus le id créé.
        pokemon : {
            id : pokemon.insertid, // TODO : Le insertid doit être dans le model (voir commentaire)
            nom: lepokemon.nom,
            type_primaire: lepokemon.type_primaire,
            type_secondaire: lepokemon.type_secondaire,
            pv: lepokemon.pv,
            attaque: lepokemon.attaque,
            defense: lepokemon.defense
        }

    });
        
    })


    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la création d'un nouveau Pokémon. "
        });
    });
};

exports.modifierPokemon = (req,res) => {
    // NOTE : Tu devrais valider que les champs obligatoires sont présents
    // NOTE : Valide aussi que le poekmon existe
    Pokemon.modifierPokemon(req.params.id, req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense)
    
    .then(() => {
    
    res.send({
        message : "Le pokemon"+ req.params.id +" a été modifié avec succès",

        pokemon : {
            id : req.params.id,
            nom: req.body.nom,
            type_primaire: req.body.type_primaire,
            type_secondaire: req.body.type_secondaire,
            pv: req.body.pv,
            attaque: req.body.attaque,
            defense: req.body.defense
        }

    });
        
    })


    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la modification du Pokémon. "
        });
    });
};

exports.supprimerPokemon = (req,res) => {
    // NOTE : Valide que le poekmon existe
    Pokemon.supprimerPokemon(req.params.id)
    
    .then(() => {
    
    res.send({
        message : "Le pokemon "+ req.params.id +" a été supprimé avec succès",

        pokemon : {
            id : req.params.id,
            nom: req.body.nom,
            type_primaire: req.body.type_primaire,
            type_secondaire: req.body.type_secondaire,
            pv: req.body.pv,
            attaque: req.body.attaque,
            defense: req.body.defense
        }

    });
        
    })


    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la modification du Pokémon. "
        });
    });
>>>>>>> fc383d06ec63893cbf50fb9a7da3d3f9fbe01f98
};