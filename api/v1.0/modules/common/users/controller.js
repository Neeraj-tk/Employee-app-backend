import { UserApiError } from "./error";
import { userService } from "./user";
const util = require("util");
const db = require("../../../../../helpers/database.js");

const query = util.promisify(db.query).bind(db);
export const controller = {
  loginUser: async (req, res, next) => {
    try {
      const result = await userService.loginUser(req.body);
      res.jsend.success(result);
    } catch (err) {
      next(err);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const sqlQuery = "SELECT * from users";
      const result = await query(sqlQuery);
      res.header("content-Type", "application/JSON");
      res.status(200).send({
        success: true,
        message: "Fetched all users",
        data: result
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Error occured",
        data: err.message
      });
    }
  },
  addUser: async (req, res) => {
    try {
      let sqlQuery = "INSERT INTO users SET ?";
      const data = req.body;
      const result = await query(sqlQuery, [data]);
      sqlQuery = "SELECT * FROM users WHERE userid=?";
      const addedUser = await query(sqlQuery, [result.insertId]);
      res.header("content-Type", "application/JSON");
      res.status(201).send({
        success: true,
        message: "Added User",
        data: addedUser[0]
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Error occured",
        data: err.message
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      let sqlQuery = "DELETE FROM users WHERE userid=?";
      let result = await query(sqlQuery, [req.params.id]);
      sqlQuery = "SELECT * FROM users";
      result = await query(sqlQuery);
      res.header("content-Type", "application/JSON");
      res.status(200).send({
        success: true,
        message: "Deleted user",
        data: result
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Error occured",
        data: err.message
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      let sqlQuery = "UPDATE users  SET ? WHERE userid=?";
      let result = await query(sqlQuery, [req.body, req.params.id]);
      sqlQuery = "SELECT * FROM users WHERE userid=?";
      result = await query(sqlQuery, [req.params.id]);
      res.header("content-Type", "application/JSON");
      res.status(200).send({
        success: true,
        message: "Updated user",
        data: result
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Error occured",
        data: err.message
      });
    }
  },
  test: (req, res, next) => {
    try {
      throw new UserApiError("This is demo error", 400);
    } catch (error) {
      next(error);
    }
  },
  demo: (req, res, next) => {
    try {
      res.jsend.success("This is demo route");
    } catch (error) {
      next(error);
    }
  }
};
