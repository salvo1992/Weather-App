import styles from './Footer.module.css';
import logo    from '../assets/viking_logo1.png';      // aggiungi il file in /assets

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <button
        className={styles.btn}
        onClick={() => window.open('https://the-viking-of-the-web.netlify.app', '_blank')}
      >
        <img src={logo} alt="Viking logo" className={styles.logo}/>
        <span>Creato dal <strong>IL Vikingo del Web</strong></span>
      </button>
    </footer>
  );
}

