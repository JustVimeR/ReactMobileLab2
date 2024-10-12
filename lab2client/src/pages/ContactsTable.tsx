import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Contact {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

const ContactsTable: React.FC = () => {
	const BASE_URL = import.meta.env.VITE_API_URL;
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [showLongLastNames, setShowLongLastNames] = useState<boolean>(false);

	useEffect(() => {
		fetchContacts();
	}, [showLongLastNames]);

	const fetchContacts = async () => {
		try {
			const endpoint = showLongLastNames
				? `${BASE_URL}/contacts/long-last-name`
				: `${BASE_URL}/contacts`;
			const response = await axios.get(endpoint);
			setContacts(response.data);
		} catch (error) {
			console.error("Error fetching contacts:", error);
		}
	};

	const toggleFilter = () => {
		setShowLongLastNames((prev) => !prev);
	};

	return (
		<div className="p-6">
			<Button asChild>
				<Link to="/">Go to Home</Link>
			</Button>
			<h1 className="text-xl font-bold mb-4">
				{showLongLastNames ? "Contacts with Long Last Names" : "All Contacts"}
			</h1>

			<Button onClick={toggleFilter} className="mb-4">
				{showLongLastNames
					? "Show All Contacts"
					: "Show Contacts with Long Last Names"}
			</Button>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>First Name</TableHead>
							<TableHead>Last Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Phone</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{contacts.length > 0 ? (
							contacts.map((contact) => (
								<TableRow key={contact._id}>
									<TableCell>{contact.firstName}</TableCell>
									<TableCell>{contact.lastName}</TableCell>
									<TableCell>{contact.email}</TableCell>
									<TableCell>{contact.phone}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} className="text-center">
									No contacts found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ContactsTable;
