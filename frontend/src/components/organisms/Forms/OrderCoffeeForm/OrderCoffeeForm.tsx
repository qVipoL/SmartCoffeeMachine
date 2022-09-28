import { Grid, TextField } from "@mui/material";
import { FormikValues, useField } from "formik";
import React, { FC } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputField } from "src/components/atoms/FormFields/InputField";
import { SelectField } from "src/components/atoms/FormFields/SelectField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";

interface OrderCoffeeFormProps {
  formFields: FormikValues;
}

const OrderCoffeeForm: FC<OrderCoffeeFormProps> = (props) => {
  const {
    formFields: { fullname, datetime, type, isBoss },
  } = props;

  const [field, , helper] = useField(datetime);

  const handleChange = (newValue: Dayjs | null) => {
    helper.setValue(newValue);
  };

  return (
    <Grid container spacing={4} px={5} pt={3}>
      <Grid item xs={12} sm={7}>
        <InputField
          defaultProps={{
            name: fullname.name,
            label: fullname.label,
            fullWidth: true,
            variant: "filled",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label={datetime.label}
            value={field.value}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField variant="filled" fullWidth {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectField
          fullWidth={true}
          label={type.label}
          name={type.name}
          data={[
            {
              label: "Basic",
              value: "Basic",
            },
            {
              label: "Latte",
              value: "Latte",
            },
            {
              label: "Cappucino",
              value: "Cappucino",
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectField
          fullWidth={true}
          label={isBoss.label}
          name={isBoss.name}
          data={[
            {
              label: "Yes",
              value: "true",
            },
            {
              label: "No",
              value: "false",
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default OrderCoffeeForm;
