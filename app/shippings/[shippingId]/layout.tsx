import styles from './layout.module.css';

export default function ShippingDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.shippingDetailLayoutContainer}>{children}</div>;
}
