import { useState } from 'react';
import { MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import {
	deleteCityFromTable,
	setHideModal,
} from '../../features/table/tableSlice';

const Modal = () => {
	const [mouseDownOnModal, setMouseDownOnModal] = useState(false);
	const dispatch = useAppDispatch();
	const handleClickOutside = () => {
		if (mouseDownOnModal) {
			setMouseDownOnModal(false);
			return;
		}
		dispatch(setHideModal());
	};

	const handleClickOnModal = (e: MouseEvent<HTMLElement>) => {
		setMouseDownOnModal(false);
		e.stopPropagation();
	};

	const handleMouseDownOnModal = (e: MouseEvent<HTMLElement>) => {
		setMouseDownOnModal(true);
		e.stopPropagation();
	};

	const handleClick = () => {
		dispatch(deleteCityFromTable());
		dispatch(setHideModal());
	};
	return (
		<aside className="modal-container" onClick={handleClickOutside}>
			<div
				className="modal-container__modal"
				onClick={handleClickOnModal}
				onMouseDown={handleMouseDownOnModal}
			>
				<p className="modal-container__text">Подтвердите удаление строки</p>
				<button className="modal-container__button" onClick={handleClick}>
					Да
				</button>
				<button
					className="modal-container__button"
					onClick={() => dispatch(setHideModal())}
				>
					Нет
				</button>
			</div>
		</aside>
	);
};
export default Modal;
