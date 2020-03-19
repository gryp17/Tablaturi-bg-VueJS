import moment from 'moment';

/**
 * Calculates the difference between today and the provided date
 * @param {Date} birthday
 * @param {String} calculateIn
 * @returns {String}
 */
export default (birthday, calculateIn = 'years') => {
	return moment().diff(moment(birthday), calculateIn);
};
