import express from "express";
import env from "./config/config";
import { initApp } from "./app";
import { config } from "./config/keys";

async function main() {
  const port = env.PORT || 3000;
  const server = await initApp(express(), config);
  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

main();
