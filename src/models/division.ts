import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Batches from "./batch";
import { Database } from "../types";

type TDivision = {
  id: number | null;
  batchid: number;
  name: string;
};

class Divisions extends Database<TDivision> {
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

  public static isValid(body: unknown): body is TDivision {
    return typeof body === "object" && body !== null && Divisions.getAttributes()
      ? Object.keys(Divisions.getAttributes()).every(
          (key) =>
            key in body &&
            typeof (body as any)[key] ===
              // @ts-ignore
              typeof Divisions.getAttributes()[key].defaultValue
        )
      : false;
  }

  private async _save() {
    await this.save();
  }
}

Divisions.init(
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
    tableName: "divisions",
    timestamps: false,
  }
);

Divisions.sync();

Divisions.hasMany(Batches, {
  sourceKey: "id",
  as: "batch",
});

export default Divisions;
