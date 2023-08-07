import { ref, object, string } from "yup";
import { regexToTargetAllBlankSpaces, passwordRegex } from "../constant/regex";

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
    .matches(regexToTargetAllBlankSpaces, "This field cannot contain spaces")
    .matches(
      passwordRegex,
      "Password must be 8 characters or more and contain at least one special character"
    ),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password"), null], "Passwords must match"),
});

export const validationForUpdatingTask = object().shape({
  task: string().required("Enter your task").min(1),
});
