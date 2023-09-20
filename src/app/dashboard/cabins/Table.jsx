'use client';

import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	useCallback
} from 'react';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const Table = () => {
	const gridRef = useRef(); // Optional - for accessing Grid's API
	const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

	// Each Column Definition results in one Column.
	const [columnDefs, setColumnDefs] = useState([
		{ field: 'id', maxWidth: 75 },
		{ field: 'athlete', minWidth: 190 },
		{ field: 'age' },
		{ field: 'year' },
		{ field: 'gold' },
		{ field: 'silver' },
		{ field: 'bronze' }
	]);

	// DefaultColDef sets props common to all Columns
	const defaultColDef = useMemo(() => ({
		sortable: true
	}));

	// Example of consuming Grid Event
	const cellClickedListener = useCallback((event) => {
		console.log('cellClicked', event);
	}, []);

	// Example load data from server
	useEffect(() => {
		fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
			.then((result) => result.json())
			.then((rowData) => {
				// add id to data
				let idSequence = 1;
				rowData.forEach(function (item) {
					item.id = idSequence++;
				});
				setRowData(rowData);
			});
	}, []);

	// Example using Grid's API
	const buttonListener = useCallback((e) => {
		gridRef.current.api.deselectAll();
	}, []);

	return (
		<div>
			{/* Example using Grid's API */}
			<button onClick={buttonListener}>Push Me</button>

			{/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
			<div className="ag-theme-alpine" style={{ height: 500 }}>
				<AgGridReact
					ref={gridRef} // Ref for accessing Grid's API
					rowData={rowData} // Row Data for Rows
					columnDefs={columnDefs} // Column Defs for Columns
					defaultColDef={defaultColDef} // Default Column Properties
					animateRows={true} // Optional - set to 'true' to have rows animate when sorted
					rowSelection="multiple" // Options - allows click selection of rows
					onCellClicked={cellClickedListener} // Optional - registering for Grid Event
					pagination={true}
					paginationPageSize={10}
				/>
			</div>
		</div>
	);
};

export default Table;
