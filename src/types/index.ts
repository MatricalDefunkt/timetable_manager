import { Model } from "sequelize";

export abstract class Database<TModel extends {}> extends Model<TModel> {
  isValid(): boolean {
    throw new Error("Method not implemented.");
  }
}
