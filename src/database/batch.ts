import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";

class Batch extends Model<{
  id: number | null;
  year: number;
  branch: string;
  totalStudents: number;
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
  public get totalStudents(): number {
    return this.getDataValue("total_number_of_students" as "totalStudents");
  }

  public set year(value: number) {
    this.setDataValue("year", value);
    this._save();
  }
  public set branch(value: string) {
    this.setDataValue("branch", value);
    this._save;
  }
  public set totalStudents(value: number) {
    this.setDataValue("total_number_of_students" as "totalStudents", value);
    this._save;
  }
  private async _save() {
    await this.save();
  }
}

Batch.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    year: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    totalStudents: {
      type: DataTypes.INTEGER.UNSIGNED,
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
