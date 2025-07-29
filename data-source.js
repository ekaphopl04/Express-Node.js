const { DataSource } = require("typeorm");
const { User } = require("./entities/User");

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ekaphop",
    password: "bb1234",
    database: "databasenodejs",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});

module.exports = { AppDataSource };
