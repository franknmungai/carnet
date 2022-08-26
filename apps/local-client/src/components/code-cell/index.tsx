import { useState } from 'react';
import CodeEditor from '../code-editor';
import OutputPreview from '../output-preview';
import './code-cell.css';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const onChangeHandler = (val: string) => {
    setCode(val);
  };
  return (
    <div className="code-cell container">
      <CodeEditor onChange={onChangeHandler} initialValue="" />
      <OutputPreview code={code} err={''} />
    </div>
  );
};

export default CodeCell;
