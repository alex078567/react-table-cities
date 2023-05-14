import CitiesList from './components/CitiesList/CitiesList';
import Header from './components/Header/Header';
import SearchInput from './components/SearchInput/SearchInput';
import CitiesTable from './components/Table/CitiesTable';
import { useAppSelector } from './hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const { showTable } = useAppSelector((store) => store.table);
	return (
		<main>
			<ToastContainer position="top-center" autoClose={2000} />
			<Header />
			<SearchInput />
			<CitiesList />
			{showTable && <CitiesTable />}
		</main>
	);
}

export default App;
