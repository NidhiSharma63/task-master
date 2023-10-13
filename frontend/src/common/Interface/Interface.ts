export interface ISubTask {
  value: string;
  isCompleted: boolean;
}

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
