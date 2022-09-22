const router = require("express").Router();
const careerController = require("../controller/careerController");
const isAuthenticate = require("../utils/Auth");

router.post("/add", isAuthenticate, careerController.addCareer);
router.get("/get/:id", careerController.getCareer);
router.get("/gets",  careerController.getAllCareer);
router.post("/edit/:id", isAuthenticate, careerController.editCareer);
router.delete("/delete/:id", isAuthenticate, careerController.deleteCareer);

module.exports = router;
