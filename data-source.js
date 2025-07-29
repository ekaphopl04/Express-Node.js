const { DataSource } = require("typeorm");
const { User } = require("./entities/User");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "ekaphop",
    password: process.env.DB_PASSWORD || "bb1234",
    database: process.env.DB_NAME || "databasenodejs",
    synchronize: true,
    logging: process.env.NODE_ENV !== "production",
    entities: [User],
    migrations: [],
    subscribers: [],
});

module.exports = { AppDataSource };
