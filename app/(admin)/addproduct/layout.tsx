import styles from './layout.module.css';

export default function AddProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.addProductLayoutContainer}>{children}</div>;
}
