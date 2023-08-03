import React from "react";
import FormikInput from "./FormikInput";
import FormikDatePicker from "./FormikDatePicker";
import FormikTextArea from "./FormikTextArea";
import FormikSelect from "./FormikSelect";

const FormikControls = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "formikInput":
      return <FormikInput {...rest} />;

    case "formikDatePicker":
      return <FormikDatePicker {...rest} />;

    case "formikTextArea":
      return <FormikTextArea {...rest} />;
    case "formikSelect":
      return <FormikSelect {...rest} />;
    default:
      return null;
  }
};
export default FormikControls;
