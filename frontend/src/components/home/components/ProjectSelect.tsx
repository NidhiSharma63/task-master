import { useFormikContext } from 'formik';
import { useEffect, useMemo } from 'react';
import { IFormValues, IProjects } from 'src/common/Interface/Home/Interface';
import { ISubTask } from 'src/common/Interface/Interface';
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

interface IFo {
  color: string | undefined;
  description: string;
  dueDate: Date | null;
  images: string[];
  index: number;
  label: string;
  labelColor: string;
  projectName: string | undefined;
  status: string;
  subTasks: ISubTask[];
  task: string;
}
const ProjectSelect = ({ projectData, setProjectColor }: ICreateTaskPopup) => {
  const { values } = useFormikContext<IFormValues>();

  /**
   * options to display in projects
   */

  const projectOptions = useMemo(() => {
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
