const util = require("util");

const db = require("../../../../../helpers/database.js");

const query = util.promisify(db.query).bind(db);
import { envConfig } from "../../../../../configs";
import { generateToken } from "../../../../../utils";
import { UserApiError } from "./error";

class UserService {
  async loginUser(reqInfo) {
    try {
      const { email, password } = reqInfo;
      const sqlQuery = "SELECT * FROM users where email=?";
      const result = await query(sqlQuery, [email]);
      if (result[0].password === password) {
        const token = generateToken({ email });
        const data = {
          user: result[0],
          token
        };
        return data;
      }
      throw new UserApiError("invalid password", 401);
    } catch (err) {
      throw err;
    }
  }
}

export const userService = new UserService();
