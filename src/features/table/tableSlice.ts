import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SingleCityDataI } from '../../interfaces/globalInterfaces';
import { getDataFromLocalStorage } from '../../utils/localStorage';

interface TableStateI {
	citiesListForTable: SingleCityDataI[];
	showTable: boolean;
	showModal: boolean;
	idForModal: number;
}
const cityData = getDataFromLocalStorage<SingleCityDataI[]>('tableData');
const isDataEmpty = cityData.length < 1 ? true : false;

const initialState: TableStateI = {
	citiesListForTable: cityData,
	showTable: !isDataEmpty,
	showModal: false,
	idForModal: -1,
};

const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setCitiesListForTable: (state, action: PayloadAction<SingleCityDataI>) => {
			const { payload } = action;
			state.citiesListForTable = [...state.citiesListForTable, payload];
			state.showTable = true;
		},
		setShowModal: (state, action: PayloadAction<number>) => {
			const { payload } = action;
			state.idForModal = payload;
			state.showModal = true;
		},
		setHideModal: (state) => {
			state.showModal = false;
			state.idForModal = -1;
		},
		setShowTable: (state, action: PayloadAction<boolean>) => {
			const { payload } = action;
			state.showTable = payload;
		},
		deleteCityFromTable: (state) => {
			state.citiesListForTable = state.citiesListForTable.filter((_, index) => {
				return index !== state.idForModal;
			});
		},
	},
});

export const {
	setCitiesListForTable,
	deleteCityFromTable,
	setShowTable,
	setShowModal,
	setHideModal,
} = tableSlice.actions;
export default tableSlice.reducer;
