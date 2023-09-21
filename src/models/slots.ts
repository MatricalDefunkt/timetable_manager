import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Classrooms from "./classroom";
import Subjects from "./subjects";
import Teachers from "./teachers";

type TSlot = {
  id: number | null;
  starttime: string;
  endtime: string;
  duration: number;
  subjectid: number;
  teacherid: number;
  classroomid: number;
};

class Slots extends Model<TSlot> {
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

  public static isValid(body: unknown): body is TSlot {
    return typeof body === "object" && body !== null && Slots.getAttributes()
      ? Object.keys(Slots.getAttributes()).every(
          (key) =>
            key in body &&
            typeof (body as any)[key] ===
              // @ts-ignore
              typeof Slots.getAttributes()[key].defaultValue
        )
      : false;
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

Slots.sync();

export default Slots;
