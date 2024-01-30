import styles from './layout.module.css';

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.productsLayoutContainer}>{children}</div>;
}
