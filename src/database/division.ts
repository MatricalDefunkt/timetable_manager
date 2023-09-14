import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Batch from "./batch";

class Division extends Model<{
  id: number | null;
  batchid: number;
  name: string;
}> {
  public get id(): number {
    return this.getDataValue("id")!;
  }
  public get batchid(): number {
    return this.getDataValue("batchid");
  }
  public get name(): string {
    return this.getDataValue("name");
  }

  public set batchid(value: number) {
    this.setDataValue("batchid", value);
    this._save();
  }
  public set name(value: string) {
    this.setDataValue("name", value);
    this._save();
  }

  private async _save() {
    await this.save();
  }
}

Division.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    batchid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "division",
    timestamps: false,
  }
);

Division.sync();

Division.hasMany(Batch, {
  sourceKey: "id",
  as: "batch",
});

export default Division;
