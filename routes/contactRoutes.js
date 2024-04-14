const express = require("express");
const router = express.Router();
const {  
    createContact
} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken); 
router.route("/create").post(createContact);

module.exports = router;