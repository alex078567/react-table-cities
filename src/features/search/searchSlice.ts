import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SingleCityDataI } from '../../interfaces/globalInterfaces';

interface SearchStateI {
	isError: boolean;
	isLoading: boolean;
	searchTerm: string;
	citiesList: SingleCityDataI[];
}

interface SingleCityDataFromApiI {
	oktmo: string;
	name_type_full: string;
	name_display: string;
	name_without_type: string;
	population: string;
	description: string;
}

const initialState: SearchStateI = {
	isError: false,
	isLoading: false,
	searchTerm: '',
	citiesList: [],
};

export const getCities = createAsyncThunk(
	'search/getCities',
	async (data: string) => {
		try {
			const response = await axios.get(`https://api.geotree.ru/search.php`, {
				params: {
					term: `${data}`,
					key: 'QkXRJqj2OK14',
					level: 4,
					population_null: false,
				},
			});

			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
);

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchTerm: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			state.searchTerm = payload;
		},
		resetCitiesList: (state) => {
			state.citiesList = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCities.fulfilled, (state, action) => {
			const cityListData = action.payload?.data.map(
				({
					oktmo,
					name_type_full,
					name_display,
					name_without_type,
					population,
					description,
				}: SingleCityDataFromApiI) => {
					const cityDataObject = {
						oktmoCode: oktmo,
						cityType: name_type_full,
						cityName: name_display,
						cityNameWithoutType: name_without_type,
						cityPopulation: population,
						cityRegion: description,
					};
					return cityDataObject;
				}
			);
			if (cityListData) {
				state.citiesList = cityListData;
			}
			state.isLoading = false;
		});
		builder.addCase(getCities.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCities.rejected, (state) => {
			state.isError = true;
		});
	},
});
export const { setSearchTerm, resetCitiesList } = searchSlice.actions;
export default searchSlice.reducer;
