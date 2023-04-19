const knex = require("knex")

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "./data/data.db"
    },
    useNullAsDefault: true,
})

module.exports = connectedKnex