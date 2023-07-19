import React from "react";
// import FormikInput from "src/common/formik/FormikInput";
import FormikInput from "src/common/formik/FormikInput";

const FormikControls = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "formikInput":
      return <FormikInput {...rest} />;

    default:
      return null;
  }
};
export default FormikControls;
