import { BsCodeSlash, BsMarkdown } from 'react-icons/bs';
import './add-cell.css';

const AddCell = () => {
  return (
    <div className="add-cell">
      <div className="add-buttons">
        <button className="btn" onClick={() => {}}>
          <BsCodeSlash size={18} />
          <span>Code</span>
        </button>
        <button className="btn" onClick={() => {}}>
          <BsMarkdown size={18} />
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
