import React from "react";
import FormikInput from "src/common/formik/FormikInput";
import FormikDatePicker from "src/common/formik/FormikDatePicker";
import FormikTextArea from "src/common/formik/FormikTextArea";

const FormikControls = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "formikInput":
      return <FormikInput {...rest} />;

    case "formikDatePicker":
      return <FormikDatePicker {...rest} />;

    case "formikTextArea":
      return <FormikTextArea {...rest} />;
    default:
      return null;
  }
};
export default FormikControls;
