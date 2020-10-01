import { createSlice } from "@reduxjs/toolkit";

let initalUsers = { currUser: null };

const userSlice = createSlice({
  name: "users",
  initialState: initalUsers,
  reducers: {
    setUser(state, action) {
      state.currUser = action.payload;
      console.log(state.currUser);
    },
  },
});
const { actions, reducer } = userSlice;
export const { setUser } = actions;
export default reducer;
