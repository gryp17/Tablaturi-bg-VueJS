import moment from 'moment';

export default (birthday, calculateIn = 'years') => {
	return moment().diff(moment(birthday), calculateIn);
};
