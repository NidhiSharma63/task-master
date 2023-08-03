import { getValueFromLS } from "utils/localstorage";
import { KEY_FOR_STORING_USER_DETAILS } from "constant/Misc";
import { capitalizeFirstLetter } from "utils/TextTransformer";

// it takes email and returns user first name letter

export const getUserFirstName = (email) => {
  return capitalizeFirstLetter(
    getValueFromLS(KEY_FOR_STORING_USER_DETAILS).email.split("@")[0]
  );
};
