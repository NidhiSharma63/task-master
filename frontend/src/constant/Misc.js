export const BASE_URL = process.env.REACT_APP_BASE_URL;
// export const BASE_URL = "http://localhost:3000/api/v1";
export const KEY_FOR_STORING_TOKEN = "token_for_todo";
export const KEY_FOR_STORING_USER_DETAILS = "user_details_for_todo";
export const KEY_FOR_STORING_ACTIVE_PROJECT = "active_project_for_todo";

export const statesOfTaskManager = ["Todo", "In progress", "In priority", "Done"];
// export const ACTIONS_FOR_EDITABLE_CONTENT = ["formatBlock", "h2", "h3", "italic", "bold", "p"];
export const ACTIONS_FOR_EDITABLE_CONTENT = [
  { key: "formatBlock", value: "h1" },
  { key: "formatBlock", value: "h2" },
  { key: "formatBlock", value: "h3" },
  { key: "formatBlock", value: "p" },
  { key: "italic", value: "italic" },
  { key: "bold", value: "bold" },
];
