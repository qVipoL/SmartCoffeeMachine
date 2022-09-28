// PLUGINS IMPORTS //
import React, { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { FieldError } from 'src/components/atoms/FormFields/FieldError';

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

/////////////////////////////////////////////////////////////////////////////

interface InputFieldProps {
  defaultProps: TextFieldProps;
}

const InputField: FC<InputFieldProps> = ({ defaultProps }) => {
  const [field, meta] = useField(defaultProps?.name!!);
  const { touched, error } = meta;
  const isError = Boolean(touched && error);

  const renderHelperText = () => {
    if (isError) {
      return error;
    }
  };

  return (
    <>
      <TextField error={isError} type={'text'} {...field} {...defaultProps} />
      <FieldError>{renderHelperText()}&nbsp;</FieldError>
    </>
  );
};

export default InputField;
