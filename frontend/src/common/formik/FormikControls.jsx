import React from "react";
import FormikInput from "common/formik/FormikInput";
import FormikDatePicker from "common/formik/FormikDatePicker";
import FormikTextArea from "common/formik/FormikTextArea";
import FormikSelect from "common/formik/FormikSelect";

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
