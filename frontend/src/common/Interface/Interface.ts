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
 * making this is _id optional because we are using this interface
 * for updating the task in `useUpdateTaskQueryWithDetails` so at the same time we
 * can update the task from home but in home we are using same initialvalues for creating
 * task first time and updating that task so if we create task first time from home
 * then we don't have _id so we have to make it optional
 */

/**
 * task interface for adding task
 */

export interface IAddTask {
  index: number;
  projectName: string;
  status: string;
  task: string;
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

/**
 * interface for page modal
 */

export interface IPage {
  name: string;
  content: string;
}

/**
 * interface for formikField
 */

export interface IField {
  field: {
    name: string;
    onBlur: () => void;
    onChange: () => void;
    value: string;
  };
  meta?: {
    error: string | undefined;
    initialError: undefined;
    initialTouched: boolean;
    initialValue: string;
    touched: boolean;
    value: string;
  };
  form?: any;
}

/**
 * common interface for payload
 */

export interface IUniversalInterface {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | null
    | Date
    | string[]
    | ISubTask[];
}
