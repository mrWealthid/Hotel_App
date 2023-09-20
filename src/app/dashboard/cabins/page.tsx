import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CabinList from './CabinList';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import Table from './Table';
import 'ag-grid-community/styles/ag-grid.css';

const page = () => {
	return (
		<div className="w-full">
			<h1 className="title"> All Cabins</h1>

			<CabinList />
			<Table />
		</div>
	);
};

export default page;
