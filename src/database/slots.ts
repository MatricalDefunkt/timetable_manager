import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Classroom from "./classroom";
import Subjects from "./subjects";
import Teachers from "./teachers";

class Slots extends Model<{
  id: number | null;
  starttime: string;
  endtime: string;
  duration: number;
  subjectid: number;
  teacherid: number;
  classroomid: number;
}> {
  public get id(): number {
    return this.getDataValue("id")!;
  }
  public get starttime(): string {
    return this.getDataValue("starttime");
  }
  public get endtime(): string {
    return this.getDataValue("endtime");
  }
  public get duration(): number {
    return this.getDataValue("duration");
  }
  public get subjectid(): number {
    return this.getDataValue("subjectid");
  }
  public get teacherid(): number {
    return this.getDataValue("teacherid");
  }
  public get classroomid(): number {
    return this.getDataValue("classroomid");
  }

  public set starttime(value: string) {
    this.setDataValue("starttime", value);
    this._save();
  }
  public set endtime(value: string) {
    this.setDataValue("endtime", value);
    this._save();
  }
  public set duration(value: number) {
    this.setDataValue("duration", value);
    this._save();
  }
  public set subjectid(value: number) {
    this.setDataValue("subjectid", value);
    this._save();
  }
  public set teacherid(value: number) {
    this.setDataValue("teacherid", value);
    this._save();
  }
  public set classroomid(value: number) {
    this.setDataValue("classroomid", value);
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
    starttime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endtime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacherid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classroomid: {
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

export default Slots;
