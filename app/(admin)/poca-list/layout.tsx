import styles from './layout.module.css';

export default function ShippingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.shippingsLayoutContainer}>{children}</div>;
}
