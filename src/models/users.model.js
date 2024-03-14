const sql = require("../config/db.js");
const { ajouterUser } = require("../controllers/users.controller.js");
// import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');


exports.trouverCourriel= (courriel) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT * FROM utilisateurs WHERE courriel = ?`;
        const params = [courriel]

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });
};

exports.ajouterUser = (nom, courriel, mot_de_passe) => {
    return new Promise ((resolve, reject) => {
        const cle_api = uuidv4();
        const requete = 'INSERT INTO utilisateurs VALUES (?, ?, ?, ?);';
        bcrypt.hash(mot_de_passe, costFactor)
        .then(safe => {
            const params = [nom, courriel, safe, cle_api];
            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    reject(erreur);
                }
                resolve(resultat);
            })
        })
        .catch(err => console.error(err.message))
        
    })
}

exports.validationCle = (cleApi) => {
    return new Promise ((resolve, reject) => {
        const requete = 'SELECT COUNT(*) AS nbUsager FROM utilisateurs u WHERE cle_api = ?; ';
        const parametres = [cleApi];    
        
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            resolve(resultat[0].nbUsager > 0);
        });
    })
}