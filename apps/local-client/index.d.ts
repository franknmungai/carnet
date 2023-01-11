type CellType = 'py' | 'js' | 'md';
interface Cell {
  id: string;
  type: CellType;
  content: string;
}
