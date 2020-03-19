/**
 * Converts the string into snake case
 * @param {String} string
 * @returns {String}
 */
export default (string) => {
	return string.split(/(?=[A-Z])/).join('_').toLowerCase();
};
