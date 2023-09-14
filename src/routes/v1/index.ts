import Elysia from "elysia";
import databases from "../../database";

const plugin = new Elysia();

plugin.group("/v1", (plugin) => {
  return plugin
    .get("/", ({ set }) => {
      set.status = 200;
      return {
        message: "Hello, api!",
      };
    })
    .get("/teachers", async ({ query, set, headers }) => {
      if (!headers.includes(Bun.env.BEARER_TOKEN))
      if (query.q == "all") {
        set.status = 200;
        return await databases.Teacher.findAll();
      } else {
        set.status = 400;
        return {
          message: "Bad Request",
        };
      }
    })
    .get("*", ({ set }) => {
      set.status = 403;
      return {
        message: "Forbidden",
      };
    });
});

export default plugin;
