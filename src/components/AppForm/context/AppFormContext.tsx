import React, { createContext, useMemo } from 'react';
import { ZodObject, ZodRawShape } from 'zod';

type AppFormContextType = {
  requiredFields: string[];
};

export const AppFormContext = createContext<AppFormContextType | null>(null);

type AppFormProviderProps = {
  children: React.ReactNode;
  schema: ZodObject<ZodRawShape>;
};

export const AppFormProvider: React.FC<AppFormProviderProps> = ({
  children,
  schema,
}) => {
  const requiredFields = useMemo(
    () =>
      Object.entries(schema.shape).reduce<string[]>((acc, [key, value]) => {
        if (!value.isOptional() && !value.isNullable()) {
          acc.push(key);
        }
        return acc;
      }, []),
    [schema.shape]
  );

  return (
    <AppFormContext.Provider value={{ requiredFields }}>
      {children}
    </AppFormContext.Provider>
  );
};
