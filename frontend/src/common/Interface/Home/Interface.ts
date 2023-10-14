/**
 * interface for projects
 */

import { IAddTask, ISubTask } from 'src/common/Interface/Interface';

export interface IProjects {
  color: string;
  name: string;
  userId: string;
  __v: number;
  _id: string;
}

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
