import { ReactElement } from 'react';
import { IFormikValuesForUpdatingTask } from 'src/common/Interface/Interface';
import FormikInput from 'src/common/formik/FormikInput';
import FormikInputArray from 'src/common/formik/FormikInputArray';
import FormikInputForLabel from 'src/common/formik/FormikInputForLabel';
import FormikSelect from 'src/common/formik/FormikSelect';
import FormikTextArea from 'src/common/formik/FormikTextArea';
import TinyMceDescription from 'src/common/formik/TinyMceDescription';

/**
 * interface
 */
interface IObj {
  name: string;
  color: string;
}

interface IFormikControls {
  control: string;
  name: string;
  values?: string | IObj[] | [];
  colorName?: string /**passing from color */;
  InputProps?: ReactElement /**passing from login and register */;
  handleSubmit?: (
    values: IFormikValuesForUpdatingTask,
  ) => Promise<void> /**passing from images */;
  setToggleEditModeForDescription?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const FormikControls = (props: IFormikControls) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'formikInput':
      return <FormikInput {...rest} />;

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

    // case 'images':
    //   return <FormikImage {...rest} />;
    default:
      return null;
  }
};
export default FormikControls;
