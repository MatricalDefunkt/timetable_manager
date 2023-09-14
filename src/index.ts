import { Elysia } from "elysia";
import plugin from "./routes/v1";

const app = new Elysia();

app.get("/", ({ set }) => {
  set.status = 200;
  return {
    message: "Hello, Prishita!",
  };
});

app.use(plugin);
app.listen(3000);

console.log("Server is running on port 3000");
