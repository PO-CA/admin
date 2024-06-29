import styles from './layout.module.css';

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.storeLayoutContainer}>{children}</div>;
}
