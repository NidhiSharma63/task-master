// export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const BASE_URL: string = 'http://localhost:3000/api/v1';
export const KEY_FOR_STORING_TOKEN: string = 'token_for_todo';
export const KEY_FOR_STORING_USER_DETAILS: string = 'user_details_for_todo';
export const KEY_FOR_STORING_ACTIVE_PROJECT: string =
  'active_project_for_task_master';

export const statesOfTaskManager: string[] = [
  'Todo',
  'In progress',
  'In priority',
  'Done',
];
