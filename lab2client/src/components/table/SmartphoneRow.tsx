import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";

interface Smartphone {
	_id: string;
	manufacturer: string;
	model: string;
	screenSize: number;
	warehouseAddress: string;
	price: number;
}

interface SmartphoneRowProps {
	smartphone: Smartphone;
	visibleColumns: {
		manufacturer: boolean;
		model: boolean;
		screenSize: boolean;
		warehouseAddress: boolean;
		price: boolean;
		actions: boolean;
	};
	onDelete: (id: string) => void;
	onSave: (id: string, updatedData: Partial<Smartphone>) => void;
}

const SmartphoneRow: React.FC<SmartphoneRowProps> = ({
	smartphone,
	visibleColumns,
	onDelete,
	onSave,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editingData, setEditingData] =
		useState<Partial<Smartphone>>(smartphone);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEditingData((prevData) => ({
			...prevData,
			[name]: name === "screenSize" || name === "price" ? +value : value,
		}));
	};

	const handleSave = () => {
		onSave(smartphone._id, editingData);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditingData(smartphone);
	};

	return (
		<TableRow>
			{visibleColumns.manufacturer && (
				<TableCell>
					{isEditing ? (
						<Input
							name="manufacturer"
							value={editingData.manufacturer || ""}
							onChange={handleInputChange}
						/>
					) : (
						smartphone.manufacturer
					)}
				</TableCell>
			)}
			{visibleColumns.model && (
				<TableCell>
					{isEditing ? (
						<Input
							name="model"
							value={editingData.model || ""}
							onChange={handleInputChange}
						/>
					) : (
						smartphone.model
					)}
				</TableCell>
			)}
			{visibleColumns.screenSize && (
				<TableCell>
					{isEditing ? (
						<Input
							name="screenSize"
							type="number"
							value={editingData.screenSize?.toString() || ""}
							onChange={handleInputChange}
						/>
					) : (
						smartphone.screenSize
					)}
				</TableCell>
			)}
			{visibleColumns.warehouseAddress && (
				<TableCell>
					{isEditing ? (
						<Input
							name="warehouseAddress"
							value={editingData.warehouseAddress || ""}
							onChange={handleInputChange}
						/>
					) : (
						smartphone.warehouseAddress
					)}
				</TableCell>
			)}
			{visibleColumns.price && (
				<TableCell>
					{isEditing ? (
						<Input
							name="price"
							type="number"
							value={editingData.price?.toString() || ""}
							onChange={handleInputChange}
						/>
					) : (
						smartphone.price
					)}
				</TableCell>
			)}
			{visibleColumns.actions && (
				<TableCell>
					{isEditing ? (
						<>
							<Button onClick={handleSave} className="bg-green-500">
								Save
							</Button>
							<Button onClick={handleCancel} className="bg-yellow-500 ml-2">
								Cancel
							</Button>
						</>
					) : (
						<>
							<Button
								onClick={() => setIsEditing(true)}
								className="bg-blue-500"
							>
								Edit
							</Button>
							<Button
								onClick={() => onDelete(smartphone._id)}
								className="bg-red-500 ml-2"
							>
								Delete
							</Button>
						</>
					)}
				</TableCell>
			)}
		</TableRow>
	);
};

export default SmartphoneRow;
