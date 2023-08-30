import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Batch from "./batch";

class Division extends Model<{
  id: number | null;
  batchId: number;
  name: string;
}> {
  public get id(): number {
    return this.getDataValue("id")!;
  }
  public get batchId(): number {
    return this.getDataValue("batch_id" as "batchId");
  }
  public get name(): string {
    return this.getDataValue("name");
  }

  public set batchId(value: number) {
    this.setDataValue("batch_id" as "batchId", value);
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
    batchId: {
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

Division.hasMany(Batch, {
  foreignKey: "batch_id",
  sourceKey: "id",
  as: "batch",
});

Division.sync();

export default Division;
