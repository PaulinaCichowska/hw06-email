import app from "./app.js"
import dotenv from 'dotenv'
import mongoose from "mongoose";
import path from "path";
import { setupFolder } from "./helpers/helpers.js";
dotenv.config()

const { HOST_DB: uriDb } = process.env;
const connection = mongoose.connect(uriDb);

const storeImageDir = path.join(process.cwd(), "public/avatars");
const tmpDir = path.join(process.cwd(), "tmp");

async function startServer() {
  try {
    await connection;
    app.listen(3000, async () => {
      console.log("Server running. Use our API on port: 3000")
      await setupFolder(storeImageDir);
      await setupFolder(tmpDir)
    })
  } catch (err) {
    console.log("DB not connected, shutting down");
    process.exit(1);
  }
}
startServer();