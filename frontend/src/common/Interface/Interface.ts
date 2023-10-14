export interface ISubTask {
  value: string;
  isCompleted: boolean;
}

/**
 * interface for tasks
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
 * task interface for updating the task
 */

export interface IExtendedItem
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
