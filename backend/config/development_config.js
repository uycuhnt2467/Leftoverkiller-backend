require("dotenv").config();

module.exports = {
    mysql: {
        host: process.env.HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE,
    },
    secret: process.env.MY_SECRET,
};
