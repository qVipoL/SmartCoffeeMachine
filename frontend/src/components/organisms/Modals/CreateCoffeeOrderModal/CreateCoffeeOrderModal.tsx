import React, { FC, useState } from "react";
import { Fade, Grid, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import CloseIcon from "@mui/icons-material/Close";

import { formModel, initialValues, validationSchema } from "src/util";
import { LoadingButton } from "src/components/atoms/Buttons/LoadingButton";
import { OrderCoffeeForm } from "../../Forms/OrderCoffeeForm";
import { CoffeeOrderService } from "src/services/CoffeeOrderService";

interface CreateCoffeeOrderModalProps {
  open: boolean;
  onClose: any;
}

const CreateCoffeeOrderModal: FC<CreateCoffeeOrderModalProps> = ({
  open,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    actions.setTouched({});
    actions.setSubmitting(false);
    actions.resetForm();

    setIsLoading(true);

    await CoffeeOrderService.createCoffeeOrder({
      fullname: values.fullName,
      time: new Date(values.date).toISOString(),
      type: values.type,
      isBoss: values.isBoss === "true" ? true : false,
    });

    setIsLoading(false);

    onClose();
  };

  const handleModelClose = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={handleModelClose}>
      <>
        <Fade in={open} timeout={300}>
          <Box
            sx={{
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              width: "40%",
              height: "40%",
              boxShadow: 24,
              outline: "none",
            }}
          >
            <Grid
              container
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid item mt={3} xs={12}>
                <Typography
                  variant={"h4"}
                  component={"h5"}
                  color={"black"}
                  fontWeight={500}
                >
                  Create Coffee Order
                </Typography>
                <IconButton
                  onClick={handleModelClose}
                  sx={{
                    position: "absolute",
                    right: 4,
                    top: 5,
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} mt={1}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema.coffeeOrderForm}
                  onSubmit={submitForm}
                >
                  <Form>
                    <OrderCoffeeForm formFields={formModel.formFields} />
                    <LoadingButton
                      buttonProps={{
                        disabled: isLoading,
                        sx: {
                          mt: 2,
                          fontSize: "17px",
                          pl: 2,
                          textTransform: "none",
                          backgroundColor: "primary.main",
                        },
                        type: "submit",
                        variant: "contained",
                      }}
                      text="Create Order"
                      isLoading={isLoading}
                    />
                  </Form>
                </Formik>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </>
    </Modal>
  );
};

export default CreateCoffeeOrderModal;
