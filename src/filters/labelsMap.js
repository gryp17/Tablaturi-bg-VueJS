export default (key) => {
	const labels = {
		tab: 'Текстова таблатура',
		chord: 'Акорди',
		bass: 'Бас',
		gp: 'Guitar Pro',
		'full song': 'Цяла песен',
		intro: 'Интро',
		solo: 'Соло'
	};

	return labels[key] || key;
};
