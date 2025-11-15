import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "postgres",
    username: "db_contacts_2r4n_user",
    password: "KetfXWVLe4jhKjzTxpgdIqwT0mQaqrUg",
    host: "dpg-d4c3m66r433s73d9fb3g-a.oregon-postgres.render.com",
    database: "db_contacts_2r4n",
    port: 5432,
    dialectOptions: {
        ssl: true,
    },
});

export default sequelize;
