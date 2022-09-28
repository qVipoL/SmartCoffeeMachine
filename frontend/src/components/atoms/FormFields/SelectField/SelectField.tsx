// PLUGINS IMPORTS //
import React, { FC } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useField } from "formik";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

/////////////////////////////////////////////////////////////////////////////

interface SelectFieldProps {
  data: Array<{ label: string; value: string }>;
  label: string;
  name: string;
  fullWidth?: boolean;
}

const SelectField: FC<SelectFieldProps> = (props) => {
  const { label, data, ...restProps } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const { touched, error } = meta;
  const isError = Boolean(touched && error);

  const renderHelperText = () => {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  };

  return (
    <FormControl variant="filled" {...restProps} error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} value={selectedValue || ""} variant="filled">
        {data.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {renderHelperText() || <>&nbsp;</>}
    </FormControl>
  );
};

export default SelectField;
