import { useFormContext } from 'react-hook-form';
import React from 'react';
import { AppFormInputGroup } from '../AppFormInputGroup';
import clsx from 'clsx';
import { useAppFormContext } from '../hooks/useAppFormContext';
import styles from './AppFormInput.module.scss';

type AppFormInputProps = {
  name: string;
  label: string;
  placeholder: string;
};

export const AppFormInput: React.FC<AppFormInputProps> = ({
  name,
  label,
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { requiredFields } = useAppFormContext();
  const isRequired = requiredFields.includes(name);

  return (
    <div className={styles.inputGroup}>
      <AppFormInputGroup errorMessage={errors[name]?.message as string}>
        <label htmlFor={name} className={clsx(isRequired && styles.required)}>
          {label}
        </label>
        <input
          {...register(name)}
          type='text'
          id={name}
          placeholder={placeholder}
          className={clsx(errors[name] && styles.error)}
        />
      </AppFormInputGroup>
    </div>
  );
};
