import styles from './TempBadge.module.css';

function TempBadge({ value }) {
  return <div className={styles.circle}>{Math.round(value)}°C</div>;
}

export default TempBadge;

