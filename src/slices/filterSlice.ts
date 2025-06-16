import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const date= new Date();

export interface FilterState {
  status: string | number;
  startDate: string;
  endDate: string;
  searchTerm: string;
  category: string | number;
  selectedStart: boolean
}


const initialState: FilterState = {
  status: 'Todos',
  startDate: date.toLocaleDateString(),
  endDate: date.toLocaleDateString(),
  searchTerm: '',
  category: 'Todos',
  selectedStart: false
};


const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string | number>) => {
      state.status = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | number>) => {
      state.category = action.payload;
    },
    setSelectedStart: (state, action: PayloadAction<boolean>) => {
      state.selectedStart = action.payload;
    },
  },
});

export const {
  setStatus,
  setStartDate,
  setEndDate,
  setSearchTerm,
  setCategory,
  setSelectedStart
} = filterSlice.actions;    

export default filterSlice.reducer;