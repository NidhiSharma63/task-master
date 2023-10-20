import { useFormikContext } from 'formik';
import { useEffect, useMemo } from 'react';
import { IFormValues } from 'src/common/Interface/Home/Interface';
import { IProjects } from 'src/common/Interface/Interface';
import FormikSelect from 'src/common/formik/FormikSelect';
/**
 * interface
 */

interface ICreateTaskPopup {
  projectData: {
    projects: IProjects[];
  };
  setProjectColor: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectSelect = ({ projectData, setProjectColor }: ICreateTaskPopup) => {
  const { values } = useFormikContext<IFormValues>();

  /**
   * options to display in projects
   */

  const projectOptions = useMemo<{ key: string; value: string }[] | []>(() => {
    if (projectData && projectData.projects) {
      return projectData.projects.map((item) => ({
        key: item.name || '',
        value: item.name || '',
      }));
    } else {
      return [];
    }
  }, [projectData]);

  useEffect(() => {
    const projectColorThatUserSelected = projectData?.projects?.find(
      (item) => item.name === values.projectName,
    );
    // console.log(projectColorThatUserSelected, '::projectColorThatUserSelected');
    if (projectColorThatUserSelected !== undefined) {
      setProjectColor(projectColorThatUserSelected.color);
    }
  }, [projectData?.projects, setProjectColor, values.projectName]);

  return (
    <FormikSelect
      name="projectName"
      label="project"
      values={projectOptions ?? []}
    />
  );
};

export default ProjectSelect;
