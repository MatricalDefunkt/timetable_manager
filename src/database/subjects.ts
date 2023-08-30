import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

class Subjects extends Model<{
  id: number | null;
  name: string;
  semester: number;
  credits: number;
  maxConcurrent: number;
}> {
  public get id(): number {
    return this.getDataValue("id")!;
  }
  public get name(): string {
    return this.getDataValue("name")!;
  }
  public get semester(): number {
    return this.getDataValue("semester")!;
  }
  public get credits(): number {
    return this.getDataValue("credits")!;
  }
  public get maxConcurrent(): number {
    return this.getDataValue("max_concurrent_slots" as "maxConcurrent")!;
  }

  public set id(value: number) {
    this.setDataValue("id", value);
    this._save();
  }
  public set name(value: string) {
    this.setDataValue("name", value);
    this._save();
  }
  public set semester(value: number) {
    this.setDataValue("semester", value);
    this._save();
  }
  private async _save() {
    await this.save();
  }
}

Subjects.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    credits: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    semester: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    maxConcurrent: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "subjects",
    timestamps: false,
  }
);

Subjects.sync();

export default Subjects;
