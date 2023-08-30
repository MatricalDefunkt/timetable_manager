import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

class Teachers extends Model<{
  id: number | null;
  name: string;
  expertise: string;
  maxConcurrent: number;
}> {
  public get id(): number {
    return this.getDataValue("id")!;
  }
  public get name(): string {
    return this.getDataValue("name");
  }
  public get expertise(): string {
    return this.getDataValue("expertise");
  }
  public get maxConcurrent(): number {
    return this.getDataValue("max_concurrent" as "maxConcurrent");
  }

  public set name(value: string) {
    this.setDataValue("name", value);
    this._save();
  }
  public set expertise(value: string) {
    this.setDataValue("expertise", value);
    this._save();
  }
  public set maxConcurrent(value: number) {
    this.setDataValue("max_concurrent" as "maxConcurrent", value);
    this._save();
  }

  private async _save() {
    await this.save();
  }
}

Teachers.init(
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
    expertise: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    maxConcurrent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "teachers",
    timestamps: false,
  }
);

Teachers.sync();

export default Teachers;
