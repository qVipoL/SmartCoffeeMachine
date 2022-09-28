import dayjs from "dayjs";
import formModel from "./formModel";

const {
  formFields: { fullname, type, datetime, isBoss },
} = formModel;

const initialValues = {
  [fullname.name]: "",
  [type.name]: "",
  [datetime.name]: dayjs(),
  [isBoss.name]: "",
};

export default initialValues;
