import Batches from "./batch";
import Classrooms from "./classroom";
import Divisions from "./division";
import Slots from "./slots";
import Subjects from "./subjects";
import Teachers from "./teachers";
import sequelize from "./sequelize";
import { Database } from "../types";

const databases = {
  Batches,
  Classrooms,
  Divisions,
  Slots,
  Subjects,
  Teachers,
};

export const sequelizeInstance = sequelize;

export default databases;
