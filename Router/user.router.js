const express = require("express");
const handler = require("../controller/user.controller");
const router = express.Router();

router.post("/user",handler.handler1);
router.get("/users/:id",handler.handler5);
router.patch("/user/:id",handler.handler3);
router.patch("/address/:id",handler.handler4);
router.delete("/user/:id",handler.handler2);

module.exports = router;