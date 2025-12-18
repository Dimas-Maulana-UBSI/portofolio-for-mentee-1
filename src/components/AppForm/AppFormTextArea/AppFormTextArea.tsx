import React from 'react';
import { AppFormInputGroup } from '../AppFormInputGroup';
import { useFormContext } from 'react-hook-form';
import { useAppFormContext } from '../hooks/useAppFormContext';
import clsx from 'clsx';
import styles from './AppFormTextArea.module.scss';

type AppTextAreaProps = {
  name: string;
  label: string;
  placeholder: string;
};

export const AppFormTextArea: React.FC<AppTextAreaProps> = ({
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
        <textarea
          {...register(name)}
          id={name}
          placeholder={placeholder}
          className={clsx(errors[name] && styles.error)}
        />
      </AppFormInputGroup>
    </div>
  );
};
