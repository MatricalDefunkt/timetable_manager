import Batch from "./batch";
import Classroom from "./classroom";
import Division from "./division";
import Slots from "./slots";
import Subject from "./subjects";
import Teacher from "./teachers";
import sequelize from "./sequelize";

const databases = {
  Batch,
  Classroom,
  Division,
  Slots,
  Subjects: Subject,
  Teacher,
  sequelize,
};

export default databases;
