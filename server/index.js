import server from "./src/app.js";
import { db } from "./src/db.js";

db.sync({ force: false }).then(() => {
  console.log("Database sync");
});

server.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
  console.log(`Server listening at port ${process.env.PORT}`); // eslint-disable-line no-console
});
