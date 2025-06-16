import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CustomerFiltersState {
  isActive: boolean;
}

const initialState: CustomerFiltersState = {
  isActive: false,
};

const filtersSlice = createSlice({
  name: 'LogSlice',
  initialState,
  reducers: {
    setIsActive(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
  },
});

export const { setIsActive } = filtersSlice.actions;
export default filtersSlice.reducer;
