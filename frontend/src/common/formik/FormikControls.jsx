import React from "react";
import FormikInput from "src/common/formik/FormikInput";
import FormikDatePicker from "./FormikDatePicker";

const FormikControls = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "formikInput":
      return <FormikInput {...rest} />;

    case "formikDatePicker":
      return <FormikDatePicker {...rest} />;

    default:
      return null;
  }
};
export default FormikControls;
