import { KEY_FOR_STORING_USER_DETAILS } from '../constant/Misc';
import { capitalizeFirstLetter } from './TextTransformer';
import { getValueFromLS } from './localstorage';

// it takes email and returns user first name letter

export const getUserFirstName = (): string => {
  return capitalizeFirstLetter(
    getValueFromLS(KEY_FOR_STORING_USER_DETAILS)?.email?.split('@')[0],
  );
};

export const getUserFirstNameFirstLetter = (email: string): string => {
  return capitalizeFirstLetter(
    getValueFromLS(KEY_FOR_STORING_USER_DETAILS)?.email?.split('@')[0][0],
  );
};
