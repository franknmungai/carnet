import { useCallback, useRef, useState } from 'react';
import { loadPyodide } from 'pyodide';
import CodeEditor from '../code-editor';
import OutputPreview from '../output-preview';
import './code-cell.css';

const CodeCell = () => {
  const userInput = useRef('');

  const [code, setCode] = useState('');

  const onChangeHandler = useCallback((value: string) => {
    userInput.current = value;
  }, []);

  const runCode = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      const inputCode = `
def print(value):
  return value
${userInput.current}
`;
      setCode(inputCode);
    }
  };
  return (
    <div className="code-cell" onKeyDown={runCode}>
      <div className="container">
        <CodeEditor onChange={onChangeHandler} initialValue="" />
        <OutputPreview code={code} err={''} />
      </div>
    </div>
  );
};

export default CodeCell;
