// Importer le module express
const express = require ('express');



// Créer une application express
const app = express();
const PORT = 3000;

app.use(express.json())

app.use("/api/pokemons",require("./src/routes/pokemon.route"))

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
