import moment from "moment";
import styles from './Date.module.css';

const Date = ({ date }) => {

	const convertToLocaleDate = () => {
		const format = moment(date).format("h:mm").toString();
		// const newDateFormat = moment().utc(date);

		// console.log(newDateFormat);
		return format;
	};

	return (
		<p className={styles['date']}>
			{convertToLocaleDate(date)}
		</p>
	)
};

export default Date;