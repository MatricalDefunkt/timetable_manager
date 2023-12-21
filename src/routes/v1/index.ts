import Elysia from "elysia";
import databases from "../../models";
import { ModelStatic } from "sequelize";

const plugin = new Elysia();

const { Batches, Classrooms, Divisions, Slots, Subjects, Teachers } = databases;

const createRoutesForDatabase = (database: ModelStatic<any>) => {
  plugin.group("/v1", (plugin) => {
    const resourceName = database.name.toLowerCase();
    return plugin
      .get(`/${resourceName}`, async ({ query, set, headers }) => {
        if (
          !headers.authorization ||
          (headers.authorization.startsWith("Bearer") &&
            headers.authorization.split(" ")[1] == Bun.env.BEARER_TOKEN)
        ) {
          set.status = 403;
          return {
            message: "Forbidden",
          };
        }
        if (query.q == "all") {
          set.status = 200;
          return await database.findAll();
        } else if (query.q) {
          const resource = await database.findByPk(String(query.q));
          if (resource) {
            set.status = 200;
            return resource;
          } else {
            set.status = 404;
            return {
              message: "Not Found",
            };
          }
        } else {
          set.status = 400;
          return {
            message: "Bad Request",
          };
        }
      })
      .post(`/${resourceName}`, async ({ body, set, headers }) => {
        if (
          !headers.authorization ||
          (headers.authorization.startsWith("Bearer") &&
            headers.authorization.split(" ")[1] == Bun.env.BEARER_TOKEN)
        ) {
          set.status = 403;
          return {
            message: "Forbidden",
          };
        }
        if (typeof body != "object") {
          set.status = 400;
          return {
            message: "Bad Request",
          };
        }

        const newResource = await database
          .create({
            ...body,
          })
          .catch((err) => {
            set.status = 400;
            return {
              error: err,
            };
          });
        set.status = 201;
        return newResource;
      })
      .get("*", ({ set }) => {
        set.status = 403;
        return {
          message: "Forbidden",
        };
      });
  });
};

const dbarray: { name: string; database: ModelStatic<any> }[] = [
  { name: "Teachers", database: Teachers },
  { name: "Classrooms", database: Classrooms },
  { name: "Divisions", database: Divisions },
  { name: "Slots", database: Slots },
  { name: "Subjects", database: Subjects },
  { name: "Batches", database: Batches },
];

// Create routes for each database in the list
dbarray.forEach((dbarray) => {
  createRoutesForDatabase(dbarray.database);
});

export default plugin;
