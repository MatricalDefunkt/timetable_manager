import { Elysia } from "elysia";

const app = new Elysia();

app.get("/", () => {
  return Bun.file("src/public/index.html");
});

app.get("*", () => {
  return Bun.file("src/public/403.html");
});

app.listen(3000);

console.log("Server is running on port 3000");
