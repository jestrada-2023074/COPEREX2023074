import { config } from "dotenv";
import { connect } from "./configs/mongo.js";
import { initServer } from "./configs/apps.js";

config()
connect()
initServer()
