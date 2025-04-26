// components/SearchBar/SearchBar.jsx
import styles from './SearchBar.module.css';

export default function SearchBar({ onChange }) {
  return (
    <input
      className={styles.input}
      placeholder="Cerca città…"
      onChange={e => onChange(e.target.value.trim())}
    />
  );
}

