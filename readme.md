Instalação de pacotes necessários

Para este projeto vamos precisar de instalar os módulos:

express.js — uma framework para Node que permite o desenvolvimento de aplicações web de uma forma muito simples — Saber mais aqui
body-parser — pacote usado para manipular solicitações JSON.
mongoose — biblioteca NodeJs para inter-agir com a B.D. MongoDb
ejs — template engine para criar o front-end da app

Para instalar estes pacotes usaremos o comando:

- npm install --save express body-parser mongoose ejs mysql nodemon


----------------------------------------//------------------------------------------

Connection Database - MySql

Instalar mysql workbench em sua máquina
Criar conexão com os dados:
Connection Name: carDB
Hostname: localhost
port: 3306
password: password

Depois de criar a conexão vamos criar um Schema 

Clicar no botão "Create new schema in the connected server"

- Name: cardb


Para criação da tabela devemos abrir uma SQL File e executar a query abaixo:

Use cardb;

CREATE TABLE `carDB` (
   `carId` int NOT NULL auto_increment,
   `veiculo` varchar(45) default null,
   `marca` varchar(45) default null,
   `ano` int default null,
   `descricao` varchar(300) default null,
   `vendido` tinyint(1) default null,
   `created` datetime default null,
   `updated` datetime default null,
   primary key (`carId`)
) 

-------------------------//------------------------------------------------

Compilar o projeto

Para executar o projeto basta digitar "yarn run" no terminal 

Abrir uma página no navegador e digitar "http://localhost:5000"

-------------------------//----------------------------------------------

Funcionalidades do projeto

O projeto possui as operações CRUD utilizadas na base de dados

- Para cadastrar um veículo basta clicar no ícone "+" e inserir as informações do mesmo.
- Para editar um veículo basta pesquisa-lo e clicar no ícone de detalhes em seguida clicar no botão "EDITAR".
dentro da tela editar possui um ícone de status do veículo, caso queira colocar como vendido ou à venda basta clicar no ícone.

*OBS: Não foi possível concluir algumas funcionalidades, os endpoints foram criados na api porém na parte do frontend não deu tempo de fazer o filtro dos veículos.

