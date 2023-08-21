import React from "react";
import FormikInput from "src/common/formik/FormikInput";
import FormikDatePicker from "src/common/formik/FormikDatePicker";
import FormikTextArea from "src/common/formik/FormikTextArea";
import FormikSelect from "src/common/formik/FormikSelect";
import FormikInputArray from "src/common/formik/FormikInputArray";
import FormikInputForLabel from "src/common/formik/FormikInputForLabel";

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

    case "formikInputArray":
      return <FormikInputArray {...rest} />;

    case "formikInputForLable":
      return <FormikInputForLabel {...rest} />;
    default:
      return null;
  }
};
export default FormikControls;
