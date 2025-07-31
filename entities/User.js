const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        firstName: {
            type: "varchar",
            length: 100,
        },
        lastName: {
            type: "varchar",
            length: 100,
        },
        email: {
            type: "varchar",
            length: 255,
            unique: true,
        },
        password: {
            type: "varchar",
            length: 255,
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true,
        },
    },
});

module.exports = { User };
