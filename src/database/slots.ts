import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Classroom from "./classroom";
import Subjects from "./subjects";
import Teachers from "./teachers";

class Slots extends Model<{
  id: number | null;
  startTime: string;
  endTime: string;
  duration: number;
  subjectId: number;
  teacherId: number;
  classroomId: number;
}> {
  public get id(): number {
    return this.getDataValue("id")!;
  }
  public get startTime(): string {
    return this.getDataValue("start_time" as "startTime");
  }
  public get endTime(): string {
    return this.getDataValue("end_time" as "endTime");
  }
  public get duration(): number {
    return this.getDataValue("duration");
  }
  public get subjectId(): number {
    return this.getDataValue("subject_id" as "subjectId");
  }
  public get teacherId(): number {
    return this.getDataValue("teacher_id" as "teacherId");
  }
  public get classroomId(): number {
    return this.getDataValue("class_id" as "classroomId");
  }

  public set startTime(value: string) {
    this.setDataValue("start_time" as "startTime", value);
    this._save();
  }
  public set endTime(value: string) {
    this.setDataValue("end_time" as "endTime", value);
    this._save();
  }
  public set duration(value: number) {
    this.setDataValue("duration", value);
    this._save();
  }
  public set subjectId(value: number) {
    this.setDataValue("subject_id" as "subjectId", value);
    this._save();
  }
  public set teacherId(value: number) {
    this.setDataValue("teacher_id" as "teacherId", value);
    this._save();
  }
  public set classroomId(value: number) {
    this.setDataValue("class_id" as "classroomId", value);
    this._save();
  }

  private async _save() {
    await this.save();
  }
}

Slots.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classroomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "slots",
    timestamps: false,
  }
);

Slots.hasOne(Subjects, {
  foreignKey: "subject_id",
  sourceKey: "id",
  as: "subject",
});

Slots.hasOne(Teachers, {
  foreignKey: "teacher_id",
  sourceKey: "id",
  as: "teacher",
});

Slots.hasOne(Classroom, {
  foreignKey: "class_id",
  sourceKey: "id",
  as: "class",
});

Slots.sync();

export default Slots;
