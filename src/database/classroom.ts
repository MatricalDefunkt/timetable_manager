import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

export type ClassroomTypes =
  | "lab"
  | "lecture"
  | "tutorial"
  | "seminar"
  | "project"
  | "other";

class Classroom extends Model<{
  id: number | null;
  type: ClassroomTypes;
  capacity: number;
}> {
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

  private async _save() {
    await this.save();
  }
}

Classroom.init(
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
    tableName: "classroom",
    timestamps: false,
  }
);

export default Classroom;
