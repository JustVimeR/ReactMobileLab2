// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SmartphonesTable from "./pages/SmartphonesTable";
import Contacts from "./components/Contacts";
import Geoservice from "./components/Geoservice";
import Home from "./pages/Home";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/smartphones" element={<SmartphonesTable />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/geoservice" element={<Geoservice />} />
			</Routes>
		</Router>
	);
};

export default App;
