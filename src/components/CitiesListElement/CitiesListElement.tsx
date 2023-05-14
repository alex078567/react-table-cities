import { SingleCityDataI } from '../../interfaces/globalInterfaces';

interface CitiesListElementProps
	extends Omit<SingleCityDataI, 'cityPopulation' | 'oktmoCode' | 'cityName'> {
	isInTable: boolean;
	handleClick: () => void;
}

const CitiesListElement: React.FC<CitiesListElementProps> = ({
	cityNameWithoutType,
	cityType,
	cityRegion,
	isInTable,
	handleClick,
}) => {
	return (
		<button
			tabIndex={isInTable ? -1 : 0}
			className={
				isInTable
					? 'cities-list-element cities-list-element--disabled'
					: 'cities-list-element cities-list-element--enabled'
			}
			onClick={handleClick}
		>
			<p className="cities-list-element__name">{cityNameWithoutType}</p>
			<p className="cities-list-element__type">{cityType}</p>
			<p className="cities-list-element__type">{cityRegion}</p>
		</button>
	);
};
export default CitiesListElement;
