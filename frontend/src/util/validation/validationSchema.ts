import formModel from "./formModel";
import * as yup from "yup";

const {
  formFields: { fullName, datetime, type, isBoss },
} = formModel;

const validationSchema = {
  coffeeOrderForm: yup.object().shape({
    [fullName.name]: yup.string().required(fullName.requiredErrorMsg),
    [datetime.name]: yup.date().required(datetime.requiredErrorMsg),
    [type.name]: yup.string().required(type.requiredErrorMsg),
    [isBoss.name]: yup.boolean().required(isBoss.requiredErrorMsg),
  }),
};

export default validationSchema;
