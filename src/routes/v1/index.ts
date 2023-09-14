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
      console.log(headers);
      if (
        !headers.authorization ||
        (headers.authorization.startsWith("Bearer") &&
          headers.authorization.split(" ")[1] == Bun.env.BEARER_TOKEN)
      ) {
        set.status = 401;
        return {
          message: "Unauthorized",
        };
      }
      if (query.q == "all") {
        set.status = 200;
        return await databases.Classroom.findAll();
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
