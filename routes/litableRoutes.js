const express = require("express")
const controllerLitable = require("../controllers/controllerLitable")
const router = express.Router()

router.get("/display", controllerLitable.displayLitable)

//Return Litable By Id
router.get("/getLitableById", controllerLitable.getLitableById)

router.post("/post", controllerLitable.addLitable)

router.put("/update", controllerLitable.updateLitable)

router.delete("/delete", controllerLitable.deleteLitable)



module.exports = router; 