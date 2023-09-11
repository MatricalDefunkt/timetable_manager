import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

class Batch extends Model<{
  id: number | null;
  year: number;
  branch: string;
  totalstudents: number;
}> {
  public get id(): number {
    return this.getDataValue("id")!;
  }
  public get year(): number {
    return this.getDataValue("year");
  }
  public get branch(): string {
    return this.getDataValue("branch");
  }
  public get totalstudents(): number {
    return this.getDataValue("totalstudents");
  }

  public set year(value: number) {
    this.setDataValue("year", value);
    this._save();
  }
  public set branch(value: string) {
    this.setDataValue("branch", value);
    this._save;
  }
  public set totalstudents(value: number) {
    this.setDataValue("totalstudents", value);
    this._save;
  }
  private async _save() {
    await this.save();
  }
}

Batch.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    totalstudents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "batch",
    timestamps: false,
  }
);

Batch.sync();

export default Batch;
