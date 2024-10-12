import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
	GoogleMap,
	LoadScript,
	DirectionsRenderer,
} from "@react-google-maps/api";
import axios from "axios";
import { Button } from "./ui/button";

interface Smartphone {
	id: string;
	manufacturer: string;
	model: string;
	screenSize: number;
	warehouseAddress: string;
	price: number;
}

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

const mapContainerStyle = {
	width: "100%",
	height: "800px",
};

const defaultCenter = {
	lat: 48.3794,
	lng: 31.1656,
};

const GeoService: React.FC = () => {
	const [smartphones, setSmartphones] = useState<Smartphone[]>([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");
	const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(
		null
	);
	const [destination, setDestination] = useState<{
		lat: number;
		lng: number;
	} | null>(null);
	const [directions, setDirections] =
		useState<google.maps.DirectionsResult | null>(null);
	const [error, setError] = useState<string | null>(null);

	const mapRef = useRef<google.maps.Map | null>(null);
	const originMarkerRef = useRef<google.maps.Marker | null>(null);
	const destinationMarkerRef = useRef<google.maps.Marker | null>(null);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/smartphones")
			.then((response) => {
				setSmartphones(response.data);
			})
			.catch((error) => {
				console.error("Error fetching smartphones:", error);
			});
	}, []);

	useEffect(() => {
		if (selectedWarehouse) {
			const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
				selectedWarehouse
			)}&key=${GOOGLE_MAPS_KEY}`;
			axios
				.get(geocodeUrl)
				.then((response) => {
					const location = response.data.results[0].geometry.location;
					setDestination({ lat: location.lat, lng: location.lng });
				})
				.catch((error) => {
					console.error("Error getting coordinates:", error);
				});
		}
	}, [selectedWarehouse]);

	useEffect(() => {
		if (origin && destination && mapRef.current) {
			const directionsService = new google.maps.DirectionsService();
			directionsService.route(
				{
					origin: origin,
					destination: destination,
					travelMode: google.maps.TravelMode.DRIVING,
				},
				(result, status) => {
					if (status === google.maps.DirectionsStatus.OK) {
						setDirections(result);
						setError(null);
					} else {
						console.error("Error fetching directions:", status);
						setError("No route found between these points.");
					}
				}
			);
		}
	}, [origin, destination]);

	const createMarker = (
		position: { lat: number; lng: number },
		map: google.maps.Map
	) => {
		return new google.maps.Marker({
			map,
			position,
		});
	};

	useEffect(() => {
		if (origin && mapRef.current) {
			if (!originMarkerRef.current) {
				originMarkerRef.current = createMarker(origin, mapRef.current);
			} else {
				originMarkerRef.current.setPosition(origin);
			}
		}
		if (destination && mapRef.current) {
			if (!destinationMarkerRef.current) {
				destinationMarkerRef.current = createMarker(
					destination,
					mapRef.current
				);
			} else {
				destinationMarkerRef.current.setPosition(destination);
			}
		}
	}, [origin, destination]);

	const handleWarehouseChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedWarehouse(event.target.value);
	};

	const handleLocationFetch = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setOrigin({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				(error) => {
					console.error("Error fetching location:", error);
				}
			);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	};

	return (
		<div>
			<Button asChild>
				<Link to="/">Go to Home</Link>
			</Button>
			<h1 className="text-2xl font-bold mb-4">GeoService</h1>

			<label htmlFor="warehouse-select" className="text-lg font-bold mb-4">
				Select Warehouse:
			</label>
			<select id="warehouse-select" onChange={handleWarehouseChange}>
				<option value="">Select a warehouse</option>
				{smartphones.map((smartphone, index) => (
					<option
						key={`${smartphone.id}-${index}`}
						value={smartphone.warehouseAddress}
					>
						{smartphone.model} - {smartphone.warehouseAddress}
					</option>
				))}
			</select>

			<Button onClick={handleLocationFetch}>Get Current Location</Button>

			{error && <p style={{ color: "red" }}>{error}</p>}

			<LoadScript googleMapsApiKey={GOOGLE_MAPS_KEY}>
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					center={origin || defaultCenter}
					zoom={6}
					onLoad={(map) => {
						mapRef.current = map;
					}}
				>
					{directions && <DirectionsRenderer directions={directions} />}
				</GoogleMap>
			</LoadScript>
		</div>
	);
};

export default GeoService;
