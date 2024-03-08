'use client';
import styles from './page.module.css';
import { useIsAdmin } from '@/hooks/useIAdmin';
import { FadeLoader } from 'react-spinners';

export default function Home() {
  useIsAdmin();

  return (
    <main className={styles.mainContainer}>
      유저정보 확인중{' '}
      <FadeLoader
        cssOverride={{ marginLeft: '10px' }}
        height={15}
        width={7}
        radius={12}
        color="#356e70"
      />{' '}
    </main>
  );
}
