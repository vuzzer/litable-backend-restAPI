const express = require("express")
const controllerClient = require("../controllers/controllerClient")
const router = express.Router()

router.post("/register", controllerClient.register)

//Return Litable By Id
/* router.post("/login", controllerClient.getLitableById)

router.post("/logout", controllerClient.addLitable)

router.delete("/deleteAccount", controllerClient.deleteLitable)

router.patch("/updateInfo", controllerClient.updateInfo) */

module.exports = router; 