import styles from './CityBadge.module.css';

function CityBadge({ name }) {
  return <div className={styles.wrapper}>{name}</div>;
}

export default CityBadge;


