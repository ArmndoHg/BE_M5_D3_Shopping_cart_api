import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { pgConnect, syncModels } from "./db.js";
import productsRouter from "./api/products/index.js";

const server = express();
const port = process.env.PORT || 3001;

//****************************** MIDDLEWARES ************************************* */

server.use(cors());
server.use(express.json());

//***************************  ENDPOINTS *********************************** */

server.use("/products", productsRouter);

//************************ ERROR HANDLERS ************************************* */

await pgConnect();
await syncModels();

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});
