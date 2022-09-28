// PLUGINS IMPORTS //
import React, { FC } from 'react';
import { useField } from 'formik';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface CheckboxFieldProps {
  name: string;
  label: string;
}

const CheckboxField: FC<CheckboxFieldProps> = (props) => {
  const { label, ...restProps } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;

  const renderHelperText = () => {
    const { touched, error } = meta;

    if (touched && error) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  };

  const onChange = (e: any) => {
    setValue(e.target.checked);
  };

  return (
    <FormControl {...restProps}>
      <FormControlLabel
        value={field.checked}
        checked={field.checked}
        control={<Checkbox {...field} onChange={onChange} />}
        label={label}
      />
      {renderHelperText()}
    </FormControl>
  );
};

export default CheckboxField;
