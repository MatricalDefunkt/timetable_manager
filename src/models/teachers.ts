import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Classrooms from "./classroom";
import { Database } from "../types";

type TTeacher = {
  id: number | null;
  name: string;
  expertise: string[];
  maxconcurrentslots: number;
};

class Teachers extends Database<TTeacher> {
  public get id(): number {
    return this.getDataValue("id")!;
  }
  public get name(): string {
    return this.getDataValue("name");
  }
  public get expertise(): string[] {
    return this.getDataValue("expertise");
  }
  public get maxconcurrentslots(): number {
    return this.getDataValue("maxconcurrentslots");
  }

  public set name(value: string) {
    this.setDataValue("name", value);
    this._save();
  }
  public set expertise(value: string[]) {
    this.setDataValue("expertise", value);
    this._save();
  }
  public set maxconcurrentslots(value: number) {
    this.setDataValue("maxconcurrentslots", value);
    this._save();
  }

  public static isValid(body: unknown): body is TTeacher {
    return typeof body === "object" && body !== null && Teachers.getAttributes()
      ? Object.keys(Teachers.getAttributes()).every(
          (key) =>
            key in body &&
            typeof (body as any)[key] ===
              // @ts-ignore
              typeof Teachers.getAttributes()[key].defaultValue
        )
      : false;
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
      type: DataTypes.ARRAY(DataTypes.STRING(255)),
      allowNull: false,
    },
    maxconcurrentslots: {
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

Teachers.belongsTo(Classrooms, { foreignKey: "id", as: "classroomid" });

export default Teachers;
