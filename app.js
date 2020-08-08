const express = require('express');
const bodyParser = require("body-parser");

const app = express()
, pool = require('./src/connectionDb')
, connectionMiddleware = require('./src/connectionMiddleware');

let port = 5000;
app.use(connectionMiddleware(pool));
app.use(bodyParser.json());

app.listen(process.env.port || port, () =>{
    console.log('Servidor em execução no porta: '+ port);
});

// app.get("/", function(req, res){
//     res.send("END POINT INVÁLIDO!");
// });

const routes = require("./src/routes/api");
app.use("/api", routes);
app.use('/', require('./src/routes/api'));
app.use(express.static(__dirname + '/src'));

