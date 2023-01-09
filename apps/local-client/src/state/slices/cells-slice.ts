import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CellType = 'py' | 'js' | 'text';
interface Cell {
  id: string;
  type: CellType;
  content: string;
}
interface CellState {
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

interface InsertCellAction {
  previousCellId?: string;
  content: string;
  type: CellType;
}

const initialState: CellState = {
  order: [],
  data: {},
};

export const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    insertCellAfter(state, action: PayloadAction<InsertCellAction>) {
      const { type, content, previousCellId } = action.payload;
      const cell: Cell = {
        content,
        type,
        id: generateRandomId(),
      };

      if (!previousCellId) {
        state.order.push(cell.id);
        state.data[cell.id] = cell;
        return state;
      }
      const foundIndex = state.order.findIndex(
        (cellId) => cellId === previousCellId
      );
      if (foundIndex === -1) {
        return state;
      }

      state.order.splice(foundIndex, 0, cell.id);
      state.data[cell.id] = cell;
      return state;
    },
  },
});

const generateRandomId = () => {
  return Math.random().toString(36).slice(2);
};

export default cellsSlice.reducer;
export const { insertCellAfter } = cellsSlice.actions;
