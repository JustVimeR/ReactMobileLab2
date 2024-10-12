const Contact = require("../models/Contact");

const getAllContacts = async (req, res) => {
	try {
		const contacts = await Contact.find();
		res.status(200).json(contacts);
	} catch (error) {
		res.status(500).json({ message: "Error fetching contacts", error });
	}
};

const getContactsWithLongLastName = async (req, res) => {
	try {
		const contacts = await Contact.find({
			$where: "this.lastName.length > 10",
		});
		res.status(200).json(contacts);
	} catch (error) {
		res.status(500).json({ message: "Error fetching contacts", error });
	}
};

module.exports = { getAllContacts, getContactsWithLongLastName };
