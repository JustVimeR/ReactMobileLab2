const express = require("express");
const router = express.Router();
const {
	getAllContacts,
	getContactsWithLongLastName,
} = require("../controllers/contactController");

router.get("/", getAllContacts);

router.get("/long-last-name", getContactsWithLongLastName);

module.exports = router;
