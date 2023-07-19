import { object, string } from "yup";
import { regexToTargetAllBlankSpaces } from "src/constant/regex";

export const loginSchema = object().shape({
  email: string().required("Enter your email").email("Invalid email format"),
  password: string()
    .required("Password required")
    .matches(regexToTargetAllBlankSpaces, "This field cannot contains sapces"),
});
