export interface ITable {
	queryKey: string;
	children: React.ReactNode;

	columns: Icolumn[];
	headerActions?: React.ReactNode;

	limit?: number;
	service: any;
}

interface TableConfig {
	actionable?: boolean;
	checkable?: boolean;
}

export interface Icolumn {
	header: string;
	accessor: string;
	key?: string;
	custom?: {
		type: string;
		suffix?: string;
		prefix?: string;
		bolden?: boolean;
	};
	searchType?: 'TEXT' | 'DROPDOWN' | 'NUMBER';
	selectOptions?: Object[];
}