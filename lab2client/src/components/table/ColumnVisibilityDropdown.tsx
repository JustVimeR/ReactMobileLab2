import React from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
	DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface ColumnVisibilityDropdownProps {
	visibleColumns: {
		manufacturer: boolean;
		model: boolean;
		screenSize: boolean;
		warehouseAddress: boolean;
		price: boolean;
		actions: boolean;
	};
	setVisibleColumns: React.Dispatch<
		React.SetStateAction<{
			manufacturer: boolean;
			model: boolean;
			screenSize: boolean;
			warehouseAddress: boolean;
			price: boolean;
			actions: boolean;
		}>
	>;
}

const ColumnVisibilityDropdown: React.FC<ColumnVisibilityDropdownProps> = ({
	visibleColumns,
	setVisibleColumns,
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					Manage Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				{Object.keys(visibleColumns).map((key) => (
					<DropdownMenuCheckboxItem
						key={key}
						checked={visibleColumns[key as keyof typeof visibleColumns]}
						onCheckedChange={(checked) =>
							setVisibleColumns((prev) => ({
								...prev,
								[key]: checked,
							}))
						}
					>
						{key.charAt(0).toUpperCase() + key.slice(1)}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ColumnVisibilityDropdown;
