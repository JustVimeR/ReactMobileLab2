import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";

interface SmartphoneFormProps {
	onSuccess: () => void;
}

const SmartphoneForm: React.FC<SmartphoneFormProps> = ({ onSuccess }) => {
	const [form, setForm] = useState({
		manufacturer: "",
		model: "",
		screenSize: 0,
		warehouseAddress: "",
		price: 0,
	});
	const [errors, setErrors] = useState<Partial<typeof form>>({});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prevForm) => ({
			...prevForm,
			[name]: name === "screenSize" || name === "price" ? +value : value,
		}));
	};

	const validateForm = () => {
		const newErrors: Partial<typeof form> = {};

		if (!form.manufacturer) newErrors.manufacturer = "Manufacturer is required";
		if (!form.model) newErrors.model = "Model is required";
		if (!form.warehouseAddress)
			newErrors.warehouseAddress = "Address is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;

		try {
			await axios.post("http://localhost:5000/api/smartphones", form);
			setForm({
				manufacturer: "",
				model: "",
				screenSize: 0,
				warehouseAddress: "",
				price: 0,
			});
			onSuccess();
		} catch (error) {
			console.error("Error creating smartphone:", error);
		}
	};

	return (
		<div className="mb-6 space-y-4">
			<div>
				<Label htmlFor="manufacturer">Manufacturer</Label>
				<Input
					id="manufacturer"
					name="manufacturer"
					placeholder="Manufacturer"
					value={form.manufacturer}
					onChange={handleInputChange}
				/>
				{errors.manufacturer && (
					<p className="text-red-500">{errors.manufacturer}</p>
				)}
			</div>
			<div>
				<Label htmlFor="model">Model</Label>
				<Input
					id="model"
					name="model"
					placeholder="Model"
					value={form.model}
					onChange={handleInputChange}
				/>
				{errors.model && <p className="text-red-500">{errors.model}</p>}
			</div>
			<div>
				<Label htmlFor="screenSize">Screen Size</Label>
				<Input
					id="screenSize"
					name="screenSize"
					type="number"
					placeholder="Screen Size"
					value={form.screenSize.toString()}
					onChange={handleInputChange}
				/>
				{errors.screenSize && (
					<p className="text-red-500">{errors.screenSize}</p>
				)}
			</div>
			<div>
				<Label htmlFor="warehouseAddress">Warehouse Address</Label>
				<Input
					id="warehouseAddress"
					name="warehouseAddress"
					placeholder="Warehouse Address"
					value={form.warehouseAddress}
					onChange={handleInputChange}
				/>
				{errors.warehouseAddress && (
					<p className="text-red-500">{errors.warehouseAddress}</p>
				)}
			</div>
			<div>
				<Label htmlFor="price">Price</Label>
				<Input
					id="price"
					name="price"
					type="number"
					placeholder="Price"
					value={form.price.toString()}
					onChange={handleInputChange}
				/>
				{errors.price && <p className="text-red-500">{errors.price}</p>}
			</div>
			<Button onClick={handleSubmit} className="mt-2">
				Add Smartphone
			</Button>
		</div>
	);
};

export default SmartphoneForm;
