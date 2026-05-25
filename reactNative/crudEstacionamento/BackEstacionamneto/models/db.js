/*
Instruções rápidas caso o comando no CMD não tenha funcionado: rode o container com Docker ou use docker-compose.

1) Rodar com docker run:
   docker run --name mysql-estacionamento -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=estacionamento -p 3306:3306 -d mysql:8

2) Ou crie um arquivo docker-compose.yml ao lado do projeto e rode: docker-compose up -d

Exemplo docker-compose.yml:

version: '3.1'
services:
  db:
    image: mysql:8
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: estacionamento
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:

Se estiver usando Docker Toolbox/WSL2 ou um host remoto, ajuste o HOST abaixo ou defina as variáveis de ambiente.
*/

const Sequelize = require("sequelize");
// Conexão com o banco de dados usando variáveis de ambiente para facilitar o uso com Docker/docker-compose
const DB_NAME = process.env.DB_NAME || "estacionamento";
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "root";
const DB_HOST = process.env.DB_HOST || "localhost"; // se o container estiver em outro host, ajuste via env
const DB_PORT = process.env.DB_PORT || "3306";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false, // desativa logs SQL por padrão
  dialectOptions: {
    // opções úteis se necessário, por ex. para compatibilidade com algumas versões
  },
});
//Vamos exportar as variáveis
module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
