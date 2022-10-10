import moment from "moment";

// convert date
export const date = (data) => {
	const convertedDate = moment(data).format('DD MMMM YYYY');

	return convertedDate;
}

// convert time
export const time = (data) => {
	const convertedHour = moment(data).format('hh:mm').toString();
	// console.log(convertedHour);

	return convertedHour;
}

// convert unix code`
// export const unix = (data) => {
// 	const now = moment();
// 	const convertedSeconds = moment().unix(data);
// }