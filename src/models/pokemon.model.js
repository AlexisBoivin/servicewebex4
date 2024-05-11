// À ajuster selon la structure
const sql = require("../config/db_pg.js");

// constructeur
const Pokemon = (pokemon) => {
    this.nom = pokemon.nom;
    this.type_primaire = pokemon.type_primaire;
    this.type_secondaire = pokemon.type_secondaire;
    this.pv = pokemon.pv;
    this.attaque = pokemon.attaque;
    this.defense = pokemon.defense;
};

Pokemon.trouverUnPokemon = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT * FROM pokemon WHERE id = $1`;
        const params = [id]

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Pokemon.AfficherListePaginer = (type) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT * FROM pokemon WHERE type_primaire = $1`;
        const params = [type]

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
}

Pokemon.ajouterPokemon = (nom, type_p, type_s, pv, att, def) => {
    return new Promise((resolve, reject) => {
        const requete = `INSERT INTO pokemon (nom, type_primaire, type_secondaire, pv, attaque, defense ) VALUES ($1, $2, $3, $4, $5, $6)`;
        const params = [nom, type_p, type_s, pv, att, def]
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            // TODO : Récupérer l'id du dernier enregistrement	ici
            resolve(resultat);
        });
    })

}

Pokemon.modifierPokemon = (id, nom, type_p, type_s, pv, att, def) => {
    return new Promise((resolve, reject) => {
        const requete = `UPDATE pokemon SET nom = $1, type_primaire = $2, type_secondaire = $3, pv = $4, attaque = $5, defense = $6 WHERE id = $7`;
        const params = [nom, type_p, type_s, pv, att, def, id]
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    })

}

Pokemon.supprimerPokemon = (id) => {
    return new Promise((resolve, reject) => {
        const requete = `DELETE FROM pokemon WHERE id = ?`;
        const params = [id]
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    })

}

module.exports = Pokemon;
