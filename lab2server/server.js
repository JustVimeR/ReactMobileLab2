const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const smartphoneRoutes = require("./routes/smartphoneRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", smartphoneRoutes);
app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
