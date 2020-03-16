import moment from 'moment';

export default (date, format = 'YYYY-MM-DD') => {
	return moment(date).format(format);
};
