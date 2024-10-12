import React, { useState, useEffect } from "react";
import axios from "axios";

interface Warehouse {
	_id: string;
	address: string;
}

const Geoservice: React.FC = () => {
	const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(
		null
	);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/warehouses")
			.then((response) => setWarehouses(response.data))
			.catch((error) => console.error("Error fetching warehouses:", error));
	}, []);

	const handleRouteCalculation = (warehouseAddress: string) => {
		console.log(`Calculating route to ${warehouseAddress}`);
	};

	return (
		<div>
			<h1>Geoservice</h1>
			<select
				onChange={(e) => setSelectedWarehouse(e.target.value)}
				defaultValue=""
			>
				<option value="" disabled>
					Select a warehouse
				</option>
				{warehouses.map((warehouse) => (
					<option key={warehouse._id} value={warehouse.address}>
						{warehouse.address}
					</option>
				))}
			</select>
			<button
				onClick={() =>
					selectedWarehouse && handleRouteCalculation(selectedWarehouse)
				}
				disabled={!selectedWarehouse}
			>
				Calculate Route
			</button>
		</div>
	);
};

export default Geoservice;
