import { toast } from 'react-toastify';
import {
	resetCitiesList,
	setSearchTerm,
} from '../../features/search/searchSlice';
import { setCitiesListForTable } from '../../features/table/tableSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CitiesListElement from '../CitiesListElement/CitiesListElement';
import Loading from '../Loading/Loading';

const CitiesList: React.FC = () => {
	const dispatch = useAppDispatch();
	const { citiesList, searchTerm, isLoading, isError } = useAppSelector(
		(store) => store.search
	);
	const { citiesListForTable } = useAppSelector((store) => store.table);

	const handleClick = (oktmo: string): void => {
		const selectedCity = citiesList.filter((cityData) => {
			return oktmo === cityData.oktmoCode;
		});

		dispatch(setCitiesListForTable(selectedCity[0]));
		dispatch(resetCitiesList());
		dispatch(setSearchTerm(''));
		toast.success('Город добавлен в таблицу');
	};
	const elementsInTable = new Set(
		citiesListForTable.map((tableElement) => tableElement.oktmoCode)
	);
	return (
		<section className="cities-list container">
			{searchTerm.length < 3 && (
				<h2 className="cities-list__header">
					Для поиска необходимо ввести не менее 3-х первых букв
				</h2>
			)}
			{searchTerm.length > 2 && citiesList.length < 1 && !isLoading && (
				<h2 className="cities-list__header">
					По вашему запросу ничего не найдено
				</h2>
			)}
			{isLoading && searchTerm.length > 2 && !isError && <Loading />}
			{isError && (
				<h2 className="cities-list__header">
					Возникла ошибка (подробности в консоли)
				</h2>
			)}
			{!isLoading && !isError && searchTerm.length > 2 && (
				<ul className="cities-list__list">
					{citiesList.map(
						({ oktmoCode, cityType, cityNameWithoutType, cityRegion }) => {
							return (
								<li className="cities-list__list-item" key={oktmoCode}>
									<CitiesListElement
										isInTable={elementsInTable.has(oktmoCode) ? true : false}
										handleClick={() => handleClick(oktmoCode)}
										cityNameWithoutType={cityNameWithoutType}
										cityRegion={cityRegion}
										cityType={cityType}
									/>
								</li>
							);
						}
					)}
				</ul>
			)}
		</section>
	);
};
export default CitiesList;
