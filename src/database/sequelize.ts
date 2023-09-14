import { Sequelize } from "sequelize";

if (!Bun.env.DB_ROOT_PASSWORD || !Bun.env.DB_PORT || !Bun.env.DB_HOST) {
  throw new Error(
    "DB_ROOT_PASSWORD, DB_PORT or DB_HOST is not defined in .env!"
  );
}

const sequelize = new Sequelize(
  "timetable_manager",
  "postgres",
  process.env.DB_ROOT_PASSWORD,
  {
    host: Bun.env.DB_HOST,
    dialect: "postgres",
    port: Number(process.env.DB_PORT),
  }
);

export default sequelize;
