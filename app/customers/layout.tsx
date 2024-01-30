import styles from './layout.module.css';

export default function CustomersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.customersLayoutContainer}>{children}</div>;
}
