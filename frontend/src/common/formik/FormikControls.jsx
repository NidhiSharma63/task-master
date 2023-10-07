import React from 'react';
import FormikDatePicker from 'src/common/formik/FormikDatePicker';
import FormikInput from 'src/common/formik/FormikInput';
import FormikInputArray from 'src/common/formik/FormikInputArray';
import FormikInputForLabel from 'src/common/formik/FormikInputForLabel';
import FormikSelect from 'src/common/formik/FormikSelect';
import FormikTextArea from 'src/common/formik/FormikTextArea';
import TinyMceDescription from 'src/common/formik/TinyMceDescription';
import FormikImage from 'src/common/formik/formikImage';

const FormikControls = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'formikInput':
      return <FormikInput {...rest} />;

    case 'formikDatePicker':
      return <FormikDatePicker {...rest} />;

    case 'formikTextArea':
      return <FormikTextArea {...rest} />;

    case 'formikSelect':
      return <FormikSelect {...rest} />;

    case 'formikInputArray':
      return <FormikInputArray {...rest} />;

    case 'formikInputForLable':
      return <FormikInputForLabel {...rest} />;

    case 'tinyMceDescription':
      return <TinyMceDescription {...rest} />;

    case 'attachments':
      return <FormikImage {...rest} />;
    default:
      return null;
  }
};
export default FormikControls;
