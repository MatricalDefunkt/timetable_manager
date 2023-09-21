import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import { Database } from "../types";

export type ClassroomTypes =
  | "lab"
  | "lecture"
  | "tutorial"
  | "seminar"
  | "project"
  | "other";

export type TClassroom = {
  id: number | null;
  type: ClassroomTypes;
  capacity: number;
};

class Classrooms extends Database<TClassroom> {
  public get id(): number {
    return this.getDataValue("id")!;
  }
  public get type(): ClassroomTypes {
    return this.getDataValue("type")!;
  }
  public get capacity(): number {
    return this.getDataValue("capacity")!;
  }

  public set type(value: ClassroomTypes) {
    this.setDataValue("type", value);
    this._save();
  }
  public set capacity(value: number) {
    this.setDataValue("capacity", value);
    this._save();
  }

  public static isValid(body: unknown): body is TClassroom {
    return typeof body === "object" &&
      body !== null &&
      Classrooms.getAttributes()
      ? Object.keys(Classrooms.getAttributes()).every(
          (key) =>
            key in body &&
            typeof (body as any)[key] ===
              // @ts-ignore
              typeof Classrooms.getAttributes()[key].defaultValue
        )
      : false;
  }

  private async _save() {
    await this.save();
  }
}

Classrooms.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM(
        "lab",
        "lecture",
        "tutorial",
        "seminar",
        "project",
        "other"
      ),

      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "classrooms",
    timestamps: false,
  }
);

Classrooms.sync();

export default Classrooms;
