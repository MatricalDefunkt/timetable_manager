import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import { Database } from "../types";

type TBatch = {
  id: number | null;
  passingyear: number;
  branch: string;
  totalstudents: number;
};

class Batches extends Database<TBatch> {
  public get id(): number {
    return this.getDataValue("id")!;
  }
  public get passingyear(): number {
    return this.getDataValue("passingyear");
  }
  public get branch(): string {
    return this.getDataValue("branch");
  }
  public get totalstudents(): number {
    return this.getDataValue("totalstudents");
  }

  public set passingyear(value: number) {
    this.setDataValue("passingyear", value);
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

  public static isValid(body: unknown): body is TBatch {
    return typeof body === "object" && body !== null && Batches.getAttributes()
      ? Object.keys(Batches.getAttributes()).every(
          (key) =>
            key in body &&
            typeof (body as any)[key] ===
              // @ts-ignore
              typeof Batches.getAttributes()[key].defaultValue
        )
      : false;
  }

  private async _save() {
    await this.save();
  }
}

Batches.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    passingyear: {
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
    tableName: "batches",
    timestamps: false,
  }
);

Batches.sync();

export default Batches;
