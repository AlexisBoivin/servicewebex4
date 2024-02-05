// Nous avons besoin d'importer le module express pour utiliser le Router
const express = require('express');

// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router();    

const pokemonController = require('../controllers/pokemon.controller.js');

// On utilise router au lieu de app
router.get('/liste', (req, res) => {
    pokemonController.AfficherListePaginer(req,res);
});


router.get('/:id', (req, res) => {
    pokemonController.trouverUnPokemon(req,res);
});

router.post('', (req,res) => {
    pokemonController.ajouterPokemon(req,res);
});

router.put('/:id', (req, res) => {
    pokemonController.modifierPokemon(req,res);
})

router.delete('/:id', (req, res) => {
    pokemonController.supprimerPokemon(req, res);
})
// On exporte le router pour pouvoir l'utiliser dans index.js
module.exports = router;
