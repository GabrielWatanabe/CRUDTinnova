const express = require ("express");
const router = express.Router();
var path = require('path')
path = path.join(__dirname, '../views/');
console.log(path + 'index.html')
// importa controlador 'apiController.js' da pasta: 
// "../controllers/apiController"
const apiController = require("../controllers/apiController");


router.get('/', (req, res) => {
    res.sendFile(path + 'index.html')
})

// TODO: listar pontos de interesse da BD
router.get("/veiculos",apiController.details);
// TODO: adicionar novo ponto de interesse
router.post("/veiculos",apiController.add);
// TODO: atualizar ponto de interesse
router.put("/veiculos/:id",apiController.update);

router.patch("/veiculos/:id",apiController.updateEach);
// TODO: apagar ponto de interesse
router.delete("/veiculos/:id",apiController.delete);

module.exports = router;