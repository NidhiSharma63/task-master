import FormikSelect from 'src/common/formik/FormikSelect';
import { IProjects } from 'src/common/Interface/Home/Interface';

/**
 * interface
 */

interface ICreateTaskPopup {
  projectData: {
    projects: IProjects[];
  };
}
const ProjectSelect = ({ projectData }: ICreateTaskPopup) => {
  /**
   * options to display in projects
   */

  const projectOptions = projectData?.projects?.map((item) => ({
    key: item?.name,
    value: item?.name,
  }));

  return (
    <FormikSelect
      name="projectName"
      label="project"
      values={projectOptions ?? []}
    />
  );
};

export default ProjectSelect;
