'use client';
import { useSignIn } from '@/query/query/users';
import styles from './page.module.css';
import Link from 'next/link';
import { SignIn } from '@/types/signIn';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIsAdmin } from '@/hooks/useIAdmin';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { mutateAsync: signIn } = useSignIn();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<SignIn> = (data) => signIn(data);

  useIsAdmin();

  return (
    <main className={styles.mainContainer}>
      <div className={styles.subTitle}>로그인</div>
      <form className={styles.signUpBox} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.logoContainer}></div>
        <div className={styles.titleContainer}></div>
        <div className={styles.inputContainer}>
          <label className={styles.signUpLabel}>이메일</label>
          <input
            className={styles.signUpInput}
            placeholder="이메일을 입력해주세요."
            {...register('userEmail', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                message: '이메일 형식이 아닙니다.',
              },
            })}
          />
          {errors?.userEmail ? (
            <p className="error">{errors.userEmail?.message}</p>
          ) : null}

          <label className={styles.signUpLabel}>비밀번호</label>
          <label className={styles.signUpLabel}>비밀번호</label>
          <input
            className={styles.signUpInput}
            type="password"
            placeholder="8자리 이상의 비밀번호를 입력해주세요."
            {...register('userPassword', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 8,
                message: '8자리 이상 비밀번호를 사용하세요.',
              },
            })}
          />
          {errors?.userPassword ? (
            <p className="error">{errors.userPassword?.message}</p>
          ) : null}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.bigButton} type="submit">
            로그인
          </button>
          <Link href="/signup">
            <button className={styles.bigButton} type="button">
              회원가입
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
}
