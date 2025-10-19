import styles from './layout.module.css';

export default function AlbumPurchaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.wrapper}>{children}</div>;
}
