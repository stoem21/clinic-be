import "reflect-metadata";
import { createServer } from "./server";

import dataSource from "./dbConfig/dataSource";

const port = process.env.PORT || 5001;
const server = createServer();
// establish database connection
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// test process.env call data
server.get("/test", (req, res) => {
  return res.json({ message: `hello1` });
});

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
