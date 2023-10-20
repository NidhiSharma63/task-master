/**
 * interface for projects
 */

import { IAddTask, ISubTask } from 'src/common/Interface/Interface';

/**
 * interface for createTaskpopup for form Values
 */

export interface IFormValues extends IAddTask {
  description: string;
  labelColor: string;
  dueDate: Date | null;
  label: string;
  _id?: string;
  subTasks: ISubTask[];
  color: string;
  images: string[];
}
