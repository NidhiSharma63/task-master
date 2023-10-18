import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { KEY_FOR_STORING_USER_DETAILS } from 'src/constant/Misc';
import { RootState } from 'src/store';
import { getValueFromLS } from 'src/utils/localstorage';
/**
 * interface
 */

interface IInitialState {
  user_email: string;
}

const initialState: IInitialState = {
  user_email: getValueFromLS(KEY_FOR_STORING_USER_DETAILS)?.email ?? '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userEmail: (state, action: PayloadAction<string>) => {
      state.user_email = action.payload;
    },
  },
});

export const { userEmail } = userSlice.actions;
export const usersDataInStore = (state: RootState) => state.user;
export default userSlice.reducer;
