import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize";
import Classroom from "./classroom";

class Teachers extends Model<{
  id: number | null;
  name: string;
  expertise: string[];
  maxconcurrentslots: number;
}> {
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

Teachers.belongsTo(Classroom, { foreignKey: "", as: "id" });

export default Teachers;
