import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SmartphonesTable from "./pages/SmartphonesTable";
import Home from "./pages/Home";
import ContactsTable from "./pages/ContactsTable";
import Geoservice from "@/components/Geoservice";
import AboutMe from "./pages/AboutMe";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/smartphones" element={<SmartphonesTable />} />
				<Route path="/contacts" element={<ContactsTable />} />
				<Route path="/geoservice" element={<Geoservice />} />
				<Route path="/about-me" element={<AboutMe />} />
			</Routes>
		</Router>
	);
};

export default App;
