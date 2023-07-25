import { ref, object, string, date } from "yup";
import { regexToTargetAllBlankSpaces } from "src/constant/regex";

export const loginSchema = object().shape({
  email: string().required("Enter your email").email("Invalid email format"),
  password: string()
    .required("Password required")
    .matches(regexToTargetAllBlankSpaces, "This field cannot contains sapces"),
});

export const registerSchema = object().shape({
  email: string().required("Enter your email").email("Invalid email format"),
  password: string()
    .required("Password required")
    .matches(regexToTargetAllBlankSpaces, "This field cannot contain spaces"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password"), null], "Passwords must match"),
});

export const validationForUpdatingTask = object().shape({
  task: string().required("Enter your task").min(1),
  dueDate: date().required("Date is required").nullable(),
});
