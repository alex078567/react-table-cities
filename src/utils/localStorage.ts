export const addDataToLocalStorage = <T>(name: string, data: T): void => {
	localStorage.setItem(name, JSON.stringify(data));
};

export const removeDataFromLocalStorage = (name: string): void => {
	localStorage.removeItem(name);
};
export const getDataFromLocalStorage = <T>(name: string): T => {
	const result = localStorage.getItem(name);
	const data = result ? JSON.parse(result) : [];
	return data;
};
