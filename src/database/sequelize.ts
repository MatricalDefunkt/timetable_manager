import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

if (!process.env.DB_ROOT_PASSWORD || !process.env.DB_PORT) {
  throw new Error("DB_ROOT_PASSWORD or DB_PORT is not defined");
}

const sequelize = new Sequelize(
  "timetable_manager",
  "root",
  process.env.DB_ROOT_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    port: Number(process.env.DB_PORT),
  }
);



export default sequelize;
