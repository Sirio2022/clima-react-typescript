import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Hecho con ❤️ por{' '}
        <a
          href="http://www.linkedin.com/in/juanmanuelalvarezb

"
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.juanma}>Juan Manuel Alvarez</span>
        </a>
      </p>
    </footer>
  );
}
