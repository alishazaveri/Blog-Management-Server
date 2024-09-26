import mongoose from "mongoose";
import { config } from "dotenv";
import User from "./models/user.model.js";
import makeUsersDb from "./user.db.js";
import Blog from "./models/blog.model.js";
import makeBlogsDb from "./blog.db.js";

config();

class DB {
  constructor() {
    this.connection = {};
    this.isReady = false;
  }

  async connect() {
    if (this.connection.readyState && this.connection.readyState === 1) {
      console.log(`connetion is ${this.connection.readyState}`);
      return this.connection;
    }

    try {
      // Attempt to connect to the MongoDB server
      const db = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.connection = db.connections[0];
      this.isReady = this.connection.readyState === 1;

      console.log(`Connection state: ${this.connection.readyState}`);
      return this.connection;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error(error.message);
    }
  }
}

const db = new DB();

const usersDb = makeUsersDb({ db, User });
const blogsDb = makeBlogsDb({ db, Blog });

export { usersDb, blogsDb };
