import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "hbnb_dev_db",
    synchronize: true,
    logging: false,
    entities: [__dirname + "/entities/*{.js,.ts}"],
    migrations: [],
    subscribers: [],
})

