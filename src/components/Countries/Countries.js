import { Link } from 'react-router-dom';

import styles from './Countries.module.css';

const Countries = ({ countries }) => {
	return (
		<section className={styles['countries__container']}>
			{countries.map(x => (
				<Link to={`/country/${x.name}/leagues`} title={x.name} key={x.name}>
					<div className={styles['country__flag']}>
						<img src={x.flag} alt={x.name} />
					</div>

					<div className={styles['country__name']}>
						{x.name}
					</div>
				</Link>
			))}
		</section>
	)
};

export default Countries;