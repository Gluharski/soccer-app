import moment from "moment";

// convert date
export const date = (data) => {
	const convertedDate = moment(data).format('DD MMMM YYYY');

	return convertedDate;
}

// convert time
export const time = (data) => {
	const utcDate = moment.utc(data).format('YYYY-MM-DD HH:mm:ss');
	// console.log(utcDate); // 2015-09-13 03:39:27

	const stillUtc = moment.utc(utcDate).toDate();
	const local = moment(stillUtc).local().format('HH:mm');

	return local;
}

// convert unix code`
// export const unix = (data) => {
// 	const now = moment();
// 	const convertedSeconds = moment().unix(data);
// }