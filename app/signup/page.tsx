'use client';
import { useSignUp } from '@/query/query/users';
import styles from './page.module.css';
import { SignUp } from '@/types/signUp';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useModal } from '@/hooks/useModal';
import { AlertModal } from '@/components/modal/alertModal';
import { useState } from 'react';
import { useIsAdmin } from '@/hooks/useIAdmin';

export default function SignUp() {
  const { mutateAsync: signUp } = useSignUp();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUp>({ mode: 'onChange' });

  const {
    Modal: ModalAlert,
    isOpen: alertIsOpen,
    openModal: alertOpen,
    closeModal: alertClose,
  } = useModal();

  const [text, setText] = useState('');

  const onSubmit: SubmitHandler<SignUp> = (data) =>
    signUp(data).then((data) => {
      if (data && data.errorMessage) {
        setText(data.errorMessage);
        alertOpen();
      } else {
        window.location.href = '/';
      }
    });

  useIsAdmin();

  return (
    <main className={styles.mainContainer}>
      <ModalAlert isOpen={alertIsOpen} closeModal={alertClose}>
        <AlertModal content={text} closeModal={alertClose} />
      </ModalAlert>
      <div className={styles.subTitle}>회원가입</div>
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

          <label className={styles.signUpLabel}>비밀번호 확인</label>
          <input
            className={styles.signUpInput}
            type="password"
            placeholder="8자리 이상의 비밀번호를 입력해주세요."
            {...register('checkPassword', {
              required: '비밀번호 확인은 필수 입력입니다.',
              minLength: {
                value: 8,
                message: '8자리 이상 비밀번호를 사용하세요.',
              },
              validate: {
                checkPassword: (value) =>
                  value === getValues('userPassword') ||
                  '비밀번호 확인이 일치하지 않습니다.',
              },
            })}
          />
          {errors?.checkPassword ? (
            <p className="error">{errors.checkPassword?.message}</p>
          ) : null}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.bigButton} type="submit">
            회원가입
          </button>
        </div>
      </form>
    </main>
  );
}
