const Item = ({ title, handleClick, id }) => {
	return (
		<div onClick={(id, title) => handleClick(id, title)}>
			{title}
		</div>
	);
};

export default Item;