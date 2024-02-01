import { useState } from 'react';

const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    console.log('value', value);
    setValue((prevValue) => ({
      ...prevValue,
      [id]: value,
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
