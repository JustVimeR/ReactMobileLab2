const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const smartphoneRoutes = require("./routes/smartphoneRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", smartphoneRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
