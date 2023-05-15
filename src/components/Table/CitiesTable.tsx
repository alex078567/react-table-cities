import {
	ColumnFiltersState,
	SortingState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setShowModal, setShowTable } from '../../features/table/tableSlice';
import { SingleCityDataI } from '../../interfaces/globalInterfaces';
import {
	addDataToLocalStorage,
	removeDataFromLocalStorage,
} from '../../utils/localStorage';
import Modal from '../Modal/Modal';

type City = {
	cityNameWithoutType: string;
	cityPopulation: number;
	cityRegion: string;
};

const columnHelper = createColumnHelper<City>();

const columns = [
	columnHelper.accessor('cityNameWithoutType', {
		header: 'Название города',
	}),
	columnHelper.accessor('cityPopulation', {
		header: 'Население города, чел.',
	}),
	columnHelper.accessor('cityRegion', {
		header: 'Регион',
	}),
];

const CitiesTable = () => {
	const dispatch = useAppDispatch();
	const { citiesListForTable, showModal } = useAppSelector(
		(store) => store.table
	);
	const [data, setData] = useState(() => [...citiesListForTable]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

	useEffect(() => {
		setData([...citiesListForTable]);
		if (citiesListForTable.length < 1) {
			removeDataFromLocalStorage('tableData');
		} else {
			addDataToLocalStorage<SingleCityDataI[]>('tableData', citiesListForTable);
		}
		if (citiesListForTable.length < 1) {
			dispatch(setShowTable(false));
		}
	}, [citiesListForTable, dispatch]);

	const handleClick = (id: string) => {
		dispatch(setShowModal(+id));
	};

	const table = useReactTable({
		data,
		columns,
		state: {
			columnFilters,
			sorting,
		},
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<section className="table-container container">
			<h2 className="table-container__header">Таблица с городами</h2>
			{showModal && <Modal />}
			<table className="cities-table">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder ? null : (
										<>
											<div
												{...{
													className: header.column.getCanSort()
														? 'cursor-pointer select-none'
														: '',
													onClick: header.column.getToggleSortingHandler(),
												}}
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
												{{
													asc: (
														<SlArrowUp className="cities-table__arrow-icon" />
													),
													desc: (
														<SlArrowDown className="cities-table__arrow-icon" />
													),
												}[header.column.getIsSorted() as string] ?? null}
											</div>
											<div>
												<input
													type="text"
													placeholder="поиск..."
													value={header.column.getFilterValue() as string}
													onChange={(e) =>
														header.column.setFilterValue(e.target.value)
													}
												/>
											</div>
										</>
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} onClick={() => handleClick(row.id)}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
};
export default CitiesTable;
