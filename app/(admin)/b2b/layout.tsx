import styles from './layout.module.css';

export default function B2BLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.b2bLayoutContainer}>{children}</div>;
}
