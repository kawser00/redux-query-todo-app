import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  status: "All",
  colors: []
}

//create slice for filter
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setColor: (state, action) => {
      const { color, changeType } = action.payload;
      if(changeType === 'added') {
        state.colors.push(color);
      } else {
        state.colors = state.colors.filter((c) => c !== color);
      }
    }
  }
})

export default filterSlice.reducer;
export const { setStatus, setColor } = filterSlice.actions;
