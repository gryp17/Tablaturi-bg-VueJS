const SERVER_URL = 'http://localhost:8888/Tablaturi-bg-API';

export default {
	SERVER_URL,
	API_URL: `${SERVER_URL}/API`,
	CDN_URL: `${SERVER_URL}/API/CDN`,
	TAB_TYPES: [
		'tab',
		'chord',
		'gp',
		'bass'
	],
	SECONDARY_TAB_TYPES: [
		'full song',
		'intro',
		'solo'
	],
	EMOTICONS_PATH: '/img/emoticons/',
	EMOTICONS_LIST: [
		{
			regexp: /:\)/,
			title: ':)',
			img: 'smile.png'
		},
		{
			regexp: /:\(/,
			title: ':(',
			img: 'undecided.png'
		},
		{
			regexp: /:D/,
			title: ':D',
			img: 'laugh.png'
		},
		{
			regexp: /:P/,
			title: ':P',
			img: 'stickingout.png'
		},
		{
			regexp: /8-\)/,
			title: '8-)',
			img: 'hot.png'
		},
		{
			regexp: /\|-\(/,
			title: '|-(',
			img: 'ambivalent.png'
		},
		{
			regexp: /:O/,
			title: ':O',
			img: 'largegasp.png'
		},
		{
			regexp: /\(up\)/,
			title: '(up)',
			img: 'thumbsup.png'
		},
		{
			regexp: /\(down\)/,
			title: '(down)',
			img: 'thumbsdown.png'
		},
		{
			regexp: /:@/,
			title: ':@',
			img: 'veryangry.png'
		}
	]
};
