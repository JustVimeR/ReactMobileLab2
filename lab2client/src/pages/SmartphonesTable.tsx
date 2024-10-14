import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import SmartphoneForm from "../components/table/SmartphoneForm";
import SmartphoneRow from "../components/table/SmartphoneRow";
import { useSmartphoneApi } from "../api/useSmartphoneApi";
import ColumnVisibilityDropdown from "../components/table/ColumnVisibilityDropdown";

interface Smartphone {
	_id: string;
	manufacturer: string;
	model: string;
	screenSize: number;
	warehouseAddress: string;
	price: number;
}

const SmartphonesTable: React.FC = () => {
	const [smartphones, setSmartphones] = useState<Smartphone[]>([]);
	const [filteredSmartphones, setFilteredSmartphones] = useState<Smartphone[]>(
		[]
	);
	const [visibleColumns, setVisibleColumns] = useState({
		manufacturer: true,
		model: true,
		screenSize: true,
		warehouseAddress: true,
		price: true,
		actions: true,
	});

	const [filterModel, setFilterModel] = useState<string>("Motorola");
	const [minScreenSize, setMinScreenSize] = useState<number>(5);

	const { fetchSmartphones, deleteSmartphone, saveSmartphone } =
		useSmartphoneApi();

	const fetchSmartphonesData = useCallback(async () => {
		try {
			const data = await fetchSmartphones();
			setSmartphones(data);
			setFilteredSmartphones(data);
		} catch (error) {
			console.error("Error fetching smartphones:", error);
		}
	}, [fetchSmartphones]);

	useEffect(() => {
		fetchSmartphonesData();
	}, [fetchSmartphonesData]);

	const handleDelete = async (id: string) => {
		try {
			await deleteSmartphone(id);
			fetchSmartphonesData();
		} catch (error) {
			console.error("Error deleting smartphone:", error);
		}
	};

	const handleSaveEdit = async (
		id: string,
		updatedData: Partial<Smartphone>
	) => {
		try {
			await saveSmartphone(id, updatedData);
			fetchSmartphonesData();
		} catch (error) {
			console.error("Error saving smartphone:", error);
		}
	};

	const filterSmartphones = () => {
		const filtered = smartphones.filter(
			(smartphone) =>
				smartphone.manufacturer.toLowerCase() === filterModel.toLowerCase() &&
				smartphone.screenSize > minScreenSize
		);
		setFilteredSmartphones(filtered);
	};

	const resetFilter = () => {
		setFilterModel("");
		setMinScreenSize(0);
		setFilteredSmartphones(smartphones);
	};

	const calculateAverageScreenSize = () => {
		if (filteredSmartphones.length === 0) return 0;
		const totalScreenSize = filteredSmartphones.reduce(
			(sum, smartphone) => sum + smartphone.screenSize,
			0
		);
		return totalScreenSize / filteredSmartphones.length;
	};

	return (
		<div className="p-6">
			<Button asChild>
				<Link to="/">Go to Home</Link>
			</Button>
			<h1 className="text-xl font-bold mb-4">Smartphones</h1>

			<SmartphoneForm onSuccess={fetchSmartphonesData} />

			<div className="mb-4">
				<Input
					placeholder="Filter by model"
					value={filterModel}
					onChange={(e) => setFilterModel(e.target.value)}
				/>
				<Input
					className="mt-4"
					placeholder="Minimum screen size"
					type="number"
					value={minScreenSize}
					onChange={(e) => setMinScreenSize(Number(e.target.value))}
				/>
				<Button onClick={filterSmartphones} className="mt-2">
					Apply Filter
				</Button>
				<Button onClick={resetFilter} className="mt-2 ml-2">
					Reset Filter
				</Button>
			</div>

			<div className="mb-4">
				<h2 className="text-lg font-bold">Average Screen Size:</h2>
				<p>{calculateAverageScreenSize()} inches</p>
			</div>

			<div className="mb-4">
				<ColumnVisibilityDropdown
					visibleColumns={visibleColumns}
					setVisibleColumns={setVisibleColumns}
				/>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{visibleColumns.manufacturer && (
								<TableHead>Manufacturer</TableHead>
							)}
							{visibleColumns.model && <TableHead>Model</TableHead>}
							{visibleColumns.screenSize && <TableHead>Screen Size</TableHead>}
							{visibleColumns.warehouseAddress && (
								<TableHead>Warehouse Address</TableHead>
							)}
							{visibleColumns.price && <TableHead>Price</TableHead>}
							{visibleColumns.actions && <TableHead>Actions</TableHead>}
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredSmartphones.length > 0 ? (
							filteredSmartphones.map((smartphone) => (
								<SmartphoneRow
									key={smartphone._id}
									smartphone={smartphone}
									visibleColumns={visibleColumns}
									onDelete={handleDelete}
									onSave={handleSaveEdit}
								/>
							))
						) : (
							<TableRow>
								<TableCell colSpan={6} className="text-center">
									No smartphones found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default SmartphonesTable;
