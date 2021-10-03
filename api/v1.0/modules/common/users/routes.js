const express = require("express");
const { Router } = express;
const router = new Router();
import { methodNotAllowed, validateUser, validateRole } from "../../../../../middlewares";
import { ROLES } from "../../../../../constants";
import { controller as api } from "./controller";


router.post("/login",api.loginUser);
router.use(validateUser);
router.get("/users",api.getAllUsers);
router.post("/users",api.addUser);
router.delete("/users/:id",api.deleteUser);
router.patch("/users/:id",api.updateUser);
router.route("/test").all(validateUser, validateRole(ROLES.USER)).get(api.test).all(methodNotAllowed);
router.route("/demo").get(api.demo).all(methodNotAllowed);

module.exports = router;
