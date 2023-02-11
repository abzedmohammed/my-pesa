

const Head = ({subt = 'Home'}) => {
	let titleView;
	const title = "My-Pesa"
	titleView = title + ' | ' + subt;

	document.title = titleView
};

export default Head;
