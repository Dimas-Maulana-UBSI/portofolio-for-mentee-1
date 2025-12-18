import React from 'react';
import styles from './AppFormSelect.module.scss';
import { AppFormInputGroup } from '../AppFormInputGroup';
import { useController, useFormContext } from 'react-hook-form';
import { useAppFormContext } from '../hooks/useAppFormContext';
import clsx from 'clsx';
import Select, { StylesConfig } from 'react-select';

export type SelectOption = {
  value: string;
  label: string;
};

type AppFormSelectProps = {
  name: string;
  label: string;
  options: SelectOption[];
  defaultValue?: SelectOption;
  placeholder: string;
};

export const AppFormSelect: React.FC<AppFormSelectProps> = ({
  name,
  label,
  options,
  defaultValue = null,
  placeholder,
}) => {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const { requiredFields } = useAppFormContext();
  const isRequired = requiredFields.includes(name);

  return (
    <AppFormInputGroup errorMessage={error?.message}>
      <label htmlFor={name} className={clsx(isRequired && styles.required)}>
        {label}
      </label>
      <Select
        {...field}
        options={options}
        placeholder={placeholder}
        styles={selectStyles}
      />
    </AppFormInputGroup>
  );
};

const selectStyles: StylesConfig<SelectOption, false> = {
  control: (styles, { isFocused }) => ({
    ...styles,
    borderColor: isFocused ? '#2684FF' : '#767676',
    boxShadow: 'none',
  }),
};
