import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type AsProp<T extends React.ElementType> = {
  as?: T;
};

type PropsToElement<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>;

type ButtonProps<T extends React.ElementType> = AsProp<T> & {
  children: React.ReactNode;
  className?: string;
} & Omit<PropsToElement<T>, keyof AsProp<T>>;

export const Button = <T extends React.ElementType = 'button'>({
  as,
  children,
  className,
  ...rest
}: ButtonProps<T>) => {
  const Component = as || 'button';

  return (
    <Component className={clsx(styles.button, className)} {...rest}>
      {children}
    </Component>
  );
};
