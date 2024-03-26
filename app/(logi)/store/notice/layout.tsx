import styles from './layout.module.css';

export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.ordersLayoutContainer}>{children}</div>;
}
