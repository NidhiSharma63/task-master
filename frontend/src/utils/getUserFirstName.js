import { getValueFromLS } from "src/utils/localstorage";
import { KEY_FOR_STORING_USER_DETAILS } from "src/constant/Misc";
import { capitalizeFirstLetter } from "src/utils/TextTransformer";

// it takes email and returns user first name letter

export const getUserFirstName = (email) => {
  return capitalizeFirstLetter(
    getValueFromLS(KEY_FOR_STORING_USER_DETAILS).email.split("@")[0]
  );
};
