import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, FormProvider, Path } from 'react-hook-form';
import { z, ZodObject, ZodRawShape } from 'zod';
import { AppFormProvider } from './context/AppFormContext';
import { AppFormInput } from './AppFormInput';
import { AppFormTextArea } from './AppFormTextArea';
import { AppFormSelect } from './AppFormSelect';
import styles from './AppForm.module.scss';

export type AppFormProps<TSchema extends ZodObject<ZodRawShape>> = {
  children: React.ReactNode;
  schema: TSchema;
  onSubmit: (
    data: z.infer<TSchema>,
    setError: (field: keyof z.infer<TSchema>, message: string) => void
  ) => void;
  options?: {
    clearOnSubmit?: boolean;
  };
};

type SubComponents = {
  Input: typeof AppFormInput;
  TextArea: typeof AppFormTextArea;
  Select: typeof AppFormSelect;
};

const AppFormComponent = <TSchema extends ZodObject<ZodRawShape>>({
  children,
  schema,
  onSubmit,
  options = {},
}: AppFormProps<TSchema>) => {
  type FormValues = z.infer<typeof schema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleSubmitForm = async (data: FormValues) => {
    const simplifiedSetError = (field: keyof FormValues, message: string) => {
      methods.setError(field as Path<FormValues>, { message });
    };

    onSubmit(data, simplifiedSetError);

    if (options.clearOnSubmit) {
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <AppFormProvider schema={schema}>
        <form onSubmit={methods.handleSubmit(handleSubmitForm)}>
          <div className={styles.appForm}>{children}</div>
        </form>
      </AppFormProvider>
    </FormProvider>
  );
};

export const AppForm = AppFormComponent as typeof AppFormComponent &
  SubComponents;

AppForm.Input = AppFormInput;
AppForm.TextArea = AppFormTextArea;
AppForm.Select = AppFormSelect;
