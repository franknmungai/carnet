import { useCallback, useEffect, useRef, useState } from 'react';
import { loadPyodide, PyodideInterface } from 'pyodide';

import CodeEditor from '../code-editor';
import OutputPreview from '../output-preview';
import './code-cell.css';

const CodeCell = () => {
  const userInput = useRef('');
  const pyodideRef = useRef<PyodideInterface>();
  const [output, setOutPut] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      pyodideRef.current = await loadPyodide({
        // indexURL: '/static/js/',
      });
    })();
  });

  const onChangeHandler = useCallback((value: string) => {
    userInput.current = value;
  }, []);

  const runCode = async (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'p') {
      e.preventDefault();

      const inputCode = `
def print(value):
  return value
${userInput.current}
`;
      try {
        const result = await pyodideRef.current?.runPythonAsync(inputCode);
        setOutPut(result);
      } catch (error: any) {
        setError(error);
      }
    }
  };
  return (
    <div className="code-cell" onKeyDown={runCode}>
      <div className="container">
        <CodeEditor onChange={onChangeHandler} initialValue="" />
        <OutputPreview output={output} err={error} />
      </div>
    </div>
  );
};

export default CodeCell;
