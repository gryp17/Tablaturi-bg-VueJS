import config from '@/config';

/**
 * Parses the emoticons in the passed string
 * @param {String} text
 * @returns {String}
 */
export default (text) => {
	const { EMOTICONS_LIST, EMOTICONS_PATH } = config;
	let content = text;

	EMOTICONS_LIST.forEach((emoticon) => {
		const regexp = new RegExp(emoticon.regexp, 'ig');
		const src = EMOTICONS_PATH + emoticon.img;
		content = content.replace(regexp, `<img title="${emoticon.title}" class="emoticon" src="${src}">`);
	});

	return content;
};
