const formModel = {
  formFields: {
    fullName: {
      name: "fullName",
      label: "Full name*",
      requiredErrorMsg: "Full name is required",
    },
    type: {
      name: "type",
      label: "Coffee type*",
      requiredErrorMsg: "Coffee type is required",
    },
    datetime: {
      name: "datetime",
      label: "Order time*",
      requiredErrorMsg: "Order time is required",
    },
    isBoss: {
      name: "isBoss",
      label: "Is the order for boss?*",
      requiredErrorMsg: "Required",
    },
  },
};

export default formModel;
