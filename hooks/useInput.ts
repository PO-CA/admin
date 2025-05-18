import { useState } from 'react';

const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, name, value: inputValue } = e.target as any;
    const key = name || id;
    if (!key) return; // name, id 모두 없으면 무시
    setValue((prevValue) => ({
      ...prevValue,
      [key]: inputValue,
    }));
  };

  return {
    value,
    setValue,
    onChange: handleChange,
    reset: () => setValue(initialValue),
  };
};

export default useInput;
