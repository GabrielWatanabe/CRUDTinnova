
// TODO: listar pontos de interesse da BD
exports.details = function (req, res) {
    const value = req.body;
    var query = "";
    Object.keys(value).forEach(function(item){
        query += `${item} = ${value[item]} AND`
    })
    if(query != "") {
        query = `WHERE ${query}`;
    }
    
    req.connection.query(`SELECT * FROM cardb ${query}`, (err, products) => {
        if(err) return next(err);
        res.send(products);
    })
};

exports.add = function (req, res) {
    let value = req.body
    var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    req.connection.query(`INSERT INTO cardb(veiculo, marca, ano, descricao, vendido, created) \
    VALUES('${value.veiculo}', '${value.marca}', ${value.ano}, '${value.descricao}', ${value.vendido}, '${datetime}')`, (err, products) => {
        if(!err)
        res.json(products);
        else
        console.log(err)
    })
};

exports.update = function (req, res) {
    let value = req.body
    var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    req.connection.query(`UPDATE cardb SET veiculo = '${value.veiculo}', marca = '${value.marca}', ano = ${value.ano}, descricao = '${value.descricao}', \
    vendido = ${value.vendido}, updated = '${datetime}' WHERE carId = ${req.params.id}`, (err, products) => {
        if(!err)
        res.json(products);
        else
        console.log(err)
    })
};

exports.updateEach = function (req, res) {
    let value = req.body
    var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    req.connection.query(`UPDATE cardb SET veiculo = '${value.veiculo}', marca = '${value.marca}', ano = ${value.ano}, descricao = '${value.descricao}', \
    vendido = ${value.vendido}, updated = '${datetime}' WHERE carId = ${req.params.id}`, (err, products) => {
        if(!err)
        res.json(products);
        else
        console.log(err)
    })
};

exports.delete = function (req, res) {
    let value = req.params
    console.log(value)
    req.connection.query(`DELETE FROM cardb WHERE carId = ${value.id}`, (err, products) => {
        if(!err)
        res.json(products);
        else
        console.log(err)
    })
};
