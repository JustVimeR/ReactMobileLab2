import React, { useEffect, useState } from "react";
import axios from "axios";

interface Contact {
	_id: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

const Contacts: React.FC = () => {
	const [contacts, setContacts] = useState<Contact[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/contacts")
			.then((response) => setContacts(response.data))
			.catch((error) => console.error("Error fetching contacts:", error));
	}, []);

	return (
		<div>
			<h1>Contacts</h1>
			<ul>
				{contacts
					.filter((contact) => contact.lastName.length > 10)
					.map((contact) => (
						<li key={contact._id}>
							{contact.firstName} {contact.lastName} - {contact.phoneNumber}
						</li>
					))}
			</ul>
		</div>
	);
};

export default Contacts;
