import styles from './layout.module.css';

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.dashBoardLayoutContainer}>{children}</div>;
}
