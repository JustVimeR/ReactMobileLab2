const express = require("express");
const Smartphone = require("../models/Smartphone");
const router = express.Router();

router.post("/smartphones", async (req, res) => {
	try {
		const smartphone = new Smartphone(req.body);
		const savedSmartphone = await smartphone.save();
		res.status(201).json(savedSmartphone);
	} catch (error) {
		res.status(500).json({ message: "Error creating smartphone", error });
	}
});

router.get("/smartphones", async (req, res) => {
	try {
		const smartphones = await Smartphone.find();
		res.json(smartphones);
	} catch (error) {
		res.status(500).json({ message: "Error fetching smartphones", error });
	}
});

router.put("/smartphones/:id", async (req, res) => {
	try {
		const updatedSmartphone = await Smartphone.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.json(updatedSmartphone);
	} catch (error) {
		res.status(500).json({ message: "Error updating smartphone", error });
	}
});

router.delete("/smartphones/:id", async (req, res) => {
	try {
		await Smartphone.findByIdAndDelete(req.params.id);
		res.json({ message: "Smartphone deleted" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting smartphone", error });
	}
});

module.exports = router;
