import { BsCodeSlash, BsMarkdown } from 'react-icons/bs';
import './add-cell.css';

const AddCell = () => {
  return (
    <div className={`add-cell `}>
      <div className="add-buttons">
        <button className="btn" onClick={() => {}}>
          <BsCodeSlash />
          <span>Code</span>
        </button>
        <button className="btn" onClick={() => {}}>
          <BsMarkdown />
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
