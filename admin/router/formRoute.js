const Controller = require("../controller/formController");

const router = require("express").Router();

router.post("/add", Controller.addFormData);
router.post("/auth", Controller.authenticateFormData);
router.post("/resend", Controller.resendOTP);

module.exports = router;
