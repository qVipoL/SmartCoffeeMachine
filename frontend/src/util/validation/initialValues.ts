import dayjs from "dayjs";
import formModel from "./formModel";

const {
  formFields: { fullName, type, datetime, isBoss },
} = formModel;

const initialValues = {
  [fullName.name]: "",
  [type.name]: "",
  [datetime.name]: dayjs(),
  [isBoss.name]: "",
};

export default initialValues;
