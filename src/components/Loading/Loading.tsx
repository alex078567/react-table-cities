const Loading = ({ center = true }) => {
	return <div className={center ? 'loading loading-center' : 'loading'}></div>;
};
export default Loading;
