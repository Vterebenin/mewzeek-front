import { createStandaloneToast } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";

export const tosterSlice = createSlice({
  name: "toster",
  initialState: {},
  reducers: {
    showToast: (state, { payload }) => {
      createStandaloneToast(payload);
    },
  },
});

export const { showToast } = tosterSlice.actions;

export default tosterSlice.reducer;
