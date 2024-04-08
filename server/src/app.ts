import { Express, Router } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import { connectDB } from "./config/db";

let server: http.Server | undefined = undefined;

export async function initApp(app: Express, config) {
  server = http.createServer(app);
  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  connectDB(config.MONGO_URI);

  app.use("/api/v1", routes);
  return server;
}
