const express = require("express");
const router = express.Router();
const {  
    createContact,
    getContacts,
    updateContact
} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken); 
router.route("/create").post(createContact);
router.route("/getall").get(getContacts);
router.route("/:id").put(updateContact);
module.exports = router;