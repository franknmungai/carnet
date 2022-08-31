import React, { useCallback, useEffect, useRef, useState } from 'react';
import { loadPyodide, PyodideInterface } from 'pyodide';
import CodeEditor from '../code-editor';
import OutputPreview from '../output-preview';
import bundle from '../../bundler';
import './code-cell.css';

interface Props {
  language: 'js' | 'py';
}
const CodeCell: React.FC<Props> = ({ language }) => {
  const userInput = useRef('');
  const pyodideRef = useRef<PyodideInterface>();
  const [output, setOutPut] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (language === 'py') {
      (async () => {
        pyodideRef.current = await loadPyodide({
          indexURL: '/static/js/',
        });
      })();
    }
  });

  const onChangeHandler = useCallback((value: string) => {
    userInput.current = value;
  }, []);

  const runPy = async (e: React.KeyboardEvent) => {
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

  const runJS = useCallback((e: React.KeyboardEvent) => {
    if (!(e.ctrlKey && e.key.toLowerCase() === 'p')) {
      return;
    }
    e.preventDefault();
    (async () => {
      const printFn = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var show = (value) => {
        const root = document.querySelector('#root');
  
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      };`;
      const { code, err } = await bundle(`${printFn}\n${userInput.current}`);

      setOutPut(`${code}`);
      setError(err);
    })();
  }, []);
  return (
    <div className="code-cell" onKeyDown={runJS}>
      <div className="container">
        <CodeEditor onChange={onChangeHandler} initialValue="" language="js" />
        <OutputPreview output={output} err={error} language="js" />
      </div>
    </div>
  );
};

export default CodeCell;
