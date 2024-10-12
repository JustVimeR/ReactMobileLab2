import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
	return (
		<div className="flex flex-col items-center space-y-4">
			<h1 className="text-2xl font-bold">Mobile App - Lab 2</h1>
			<Link to="/smartphones">
				<Button>Smartphones</Button>
			</Link>
			<Link to="/contacts">
				<Button>Contacts</Button>
			</Link>
			<Link to="/geoservice">
				<Button>Geoservice</Button>
			</Link>
			<Link to="/about-me">
				<Button>About me</Button>
			</Link>
		</div>
	);
};

export default Home;
