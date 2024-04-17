const express = require("express");
const router = express.Router();
const {  
    createContact,
    getContacts,
    updateContact,
    deleteContact
} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken); 
router.route("/create").post(createContact);
router.route("/getall").get(getContacts);
router.route("/:id").put(updateContact).delete(deleteContact);
module.exports = router;