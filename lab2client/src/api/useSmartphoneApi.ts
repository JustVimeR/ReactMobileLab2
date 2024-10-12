import axios from "axios";
import { useCallback } from "react";

interface Smartphone {
	_id: string;
	manufacturer: string;
	model: string;
	screenSize: number;
	warehouseAddress: string;
	price: number;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const useSmartphoneApi = () => {
	const fetchSmartphones = useCallback(async (): Promise<Smartphone[]> => {
		try {
			const response = await axios.get(`${BASE_URL}/smartphones`);
			return response.data;
		} catch (error) {
			console.error("Error fetching smartphones:", error);
			throw error;
		}
	}, []);

	const deleteSmartphone = useCallback(async (id: string): Promise<void> => {
		try {
			await axios.delete(`${BASE_URL}/smartphones/${id}`);
		} catch (error) {
			console.error("Error deleting smartphone:", error);
			throw error;
		}
	}, []);

	const saveSmartphone = useCallback(
		async (id: string, updatedData: Partial<Smartphone>): Promise<void> => {
			try {
				await axios.put(`${BASE_URL}/smartphones/${id}`, updatedData);
			} catch (error) {
				console.error("Error saving smartphone:", error);
				throw error;
			}
		},
		[]
	);

	const createSmartphone = useCallback(
		async (data: Partial<Smartphone>): Promise<void> => {
			try {
				await axios.post(`${BASE_URL}/smartphones`, data);
			} catch (error) {
				console.error("Error creating smartphone:", error);
				throw error;
			}
		},
		[]
	);

	return {
		fetchSmartphones,
		deleteSmartphone,
		saveSmartphone,
		createSmartphone,
	};
};
