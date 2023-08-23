import { DataTypes, Model, Sequelize } from "sequelize";

const sequelize = new Sequelize("timetable_manager", "root", "Baku@2010", {
  host: "localhost",
  dialect: "mysql",
  port: 8080,
});

class Teachers extends Model<{
  id: number | null;
  name: string;
  email: string;
  password: string;
}> {
  public get id(): number {
    return this.getDataValue("id")!;
  }
  public get name(): string {
    return this.getDataValue("name");
  }
  public get email(): string {
    return this.getDataValue("email");
  }
  public get password(): string {
    return this.getDataValue("password");
  }

  public set id(value: number) {
    this.setDataValue("id", value);
    this._save();
  }
  public set name(value: string) {
    this.setDataValue("name", value);
    this._save();
  }
  public set email(value: string) {
    this.setDataValue("email", value);
    this._save();
  }
  public set password(value: string) {
    this.setDataValue("password", value);
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
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "teachers",
    timestamps: false,
  }
);

(async () => {
  await Teachers.sync();

  const newTeacher = await Teachers.create({
    name: "test",
    email: "someone@example.com",
    password: "123456",
  });
  await newTeacher.save();

  const teachers = await Teachers.findAll();
  console.log(teachers);
})();
