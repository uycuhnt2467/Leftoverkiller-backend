import dotenv from "dotenv";

dotenv.config();

export default {
    mysql: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE,
    },
    secret: process.env.MY_SECRET,
    server: {
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT
    }
};
