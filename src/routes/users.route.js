const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");

router.post('', (req, res) => {
    userController.ajouterUser(req, res);
})

module.exports = router