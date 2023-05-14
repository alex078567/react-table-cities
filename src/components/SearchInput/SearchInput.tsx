import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	getCities,
	resetCitiesList,
	setSearchTerm,
} from '../../features/search/searchSlice';

const SearchInput = () => {
	const { searchTerm } = useAppSelector((store) => store.search);
	const searchInput = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		searchInput.current?.focus();
	});

	const searchCities = () => {
		const inputData = searchInput.current?.value;

		dispatch(setSearchTerm(inputData ?? ''));

		if (inputData) {
			if (inputData?.length > 2) {
				dispatch(getCities(inputData));
			} else {
				dispatch(resetCitiesList());
			}
		}
	};

	return (
		<section className="search-input container">
			<label className="search-input__label" htmlFor="searchInput">
				Начните вводить название города
			</label>
			<input
				className="search-input__input"
				id="searchInput"
				type="text"
				placeholder="Например: Самара"
				value={searchTerm}
				ref={searchInput}
				onChange={searchCities}
			/>
		</section>
	);
};

export default SearchInput;
