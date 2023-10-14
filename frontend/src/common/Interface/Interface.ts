export interface ISubTask {
  value: string;
  isCompleted: boolean;
}

/**
 * interface for tasks coming from backend for first time
 */
export interface ITaskItem {
  _id: string;
  isNotified: boolean;
  userId: string;
  status: string;
  task: string;
  projectName: string;
  index: number;
  color: string;
  subTasks: ISubTask[];
  images: string[];
  createdAt: string;
  __v: number;
}

/**
 * task interface for updating the task from drawer
 */

export interface IFormikValuesForUpdatingTask
  extends Omit<ITaskItem, 'isNotified' | 'createdAt' | 'index' | '__v'> {
  description: string;
  label: string;
  dueDate: Date | null;
  labelColor: string;
  color: string;
}

/**
 * task interface for adding task
 */

export interface IAddTask {
  index: number;
  projectName: string;
  status: string;
  task: string;
  userId: string;
}

/**
 * interface for task displaying
 * as we are displaying task for two times first one when user created task then task have interface
 * of ITaskItem and after updating task. task has inteface of formikValues
 */

export interface IForTaskDisplaying extends ITaskItem {
  description?: string;
  dueDate?: string;
  label?: string;
  labelColor?: string;
}

/**
 * interface for column
 */
export interface IUpdatedColumnItem {
  name: string;
  _id: string;
  tasks: ITaskItem[];
}

/**
 * interface for projects
 */

export interface IProjects {
  color: string;
  name: string;
  userId: string;
  __v: number;
  _id: string;
}

/**
 * column interface
 */

export interface IColumnItem {
  index: string;
  name: string;
  projectName: string;
  userId: string;
  __v: number;
  _id: string;
}
