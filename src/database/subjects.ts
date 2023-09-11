import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

class Subjects extends Model<{
  id: number | null;
  name: string;
  semester: number;
  credits: number;
  maxconcurrentslots: number;
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
  public get maxconcurrentslots(): number {
    return this.getDataValue("maxconcurrentslots")!;
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
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxconcurrentslots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "subjects",
    timestamps: false,
  }
);

export default Subjects;
