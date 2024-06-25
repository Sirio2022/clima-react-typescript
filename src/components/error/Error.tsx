import { ReactNode } from 'react';
import styles from './Error.module.css';

export default function Error({ children }: { children: ReactNode }) {
  return <p className={styles.error}>{children}</p>;
}
