// Importer le module express
const express = require ('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/documentation.json');
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "API Pokemon"
};
const authorization = require('./src/Middleware/authorization_cle_api');


// Créer une application express
const app = express();
const PORT = 3000;


app.use(express.json())

app.use("/api/pokemons",require("./src/routes/pokemon.route"))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
// Exercice 5
app.use("/api/users", authorization, require("./src/routes/users.route"));

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
