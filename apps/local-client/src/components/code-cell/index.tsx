import { useRef, useState } from 'react';
import CodeEditor, { CodeEditor2 } from '../code-editor';
import OutputPreview from '../output-preview';
import './code-cell.css';

const CodeCell = () => {
  const userInput = useRef('');

  const [code, setCode] = useState('');

  const onChangeHandler = (input: string) => {
    userInput.current = input;
  };

  const runCode = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      setCode(userInput.current);
    }
  };
  return (
    <div className="code-cell" onKeyDown={runCode}>
      <div className="container">
        {/* <CodeEditor onChange={onChangeHandler} initialValue="" /> */}
        <CodeEditor2/>
        <OutputPreview code={code} err={''} />
      </div>
    </div>
  );
};

export default CodeCell;
