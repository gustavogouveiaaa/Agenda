const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const activityController = require("../controllers/activityController");

router.get("/", auth, activityController.list);
router.post("/", auth, activityController.create);
router.put("/:id", auth, activityController.update);
router.delete("/:id", auth, activityController.remove);
router.patch("/:id", auth, activityController.updateStatus);


module.exports = router;
