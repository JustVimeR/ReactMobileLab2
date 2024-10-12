import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutMe: React.FC = () => {
	return (
		<div className="flex flex-col items-center space-y-4 p-4">
			<img
				src="shikanoka.gif"
				alt="Author"
				className="w-48 h-48 rounded-full"
			/>
			<h1 className="text-2xl font-bold">Таран Владислав ТТП-41</h1>
			<p className="text-lg">
				Студент факультету комп'ютерних наук. Захоплююсь програмуванням та
				розробкою веб-додатків.
			</p>
			<p className="text-lg">
				Лабораторна робота присвячена створенню фронтенд-додатку на React з
				використанням TypeScript та UI-бібліотеки Shadcn UI.
			</p>
			<Link to="/">
				<Button>Home</Button>
			</Link>
		</div>
	);
};

export default AboutMe;
