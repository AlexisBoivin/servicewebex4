const utilisateur = require("../models/users.model")

exports.ajouterUser = (req, res) => {
    if (!req.body.nom || req.body.nom == "" || !req.body.courriel || req.body.courriel == "" || !req.body.mot_de_passe || req.body.mot_de_passe == "") {
        res.status(400);
        res.send({
            message: `Il manque des informations dans le corps de la requête. Vérifiez que le nom, le courriel et le mot de passe sont présent.`
        });
        return;
    }
    if(!utilisateur.trouverCourriel(req.body.courriel)){
        res.status(410);
        res.send({
            message: 'Il existe déjà un utilisateur avec ce courriel.'
        });
        return;
    }
    utilisateur.ajouterUser(req.body.nom, req.body.courriel, req.body.mot_de_passe)
    .then((nouveauuser) => {
        res.send({
            message : "L'utilisateur a été créer avec succès",
            cle_api : nouveauuser.cle_api 
        });
    })
    .catch((erreur) => {
        console.log("Erreur: ", erreur);
        res.status(500);
        res.send({
            message: "Il y a eu une erreur lors de l'ajout de l'utilisateur."
        });
    })

}