import React, { useCallback, useEffect, useRef, useState } from 'react';
import { loadPyodide, PyodideInterface } from 'pyodide';
import { BsFillPlayFill } from 'react-icons/bs';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import CodeEditor from '../code-editor';
import OutputPreview from '../output-preview';
import bundle from '../../bundler';

import './code-cell.css';
import { PythonProvider, usePython } from 'react-py';

interface Props {
  language: 'js' | 'py';
}
const CodeCell: React.FC<Props> = ({ language }) => {
  const userInput = useRef('');
  const pyodideRef = useRef<PyodideInterface>();
  const [output, setOutPut] = useState('');
  const [error, setError] = useState('');
  const [codeValue, setCodeValue] = useState('');

  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  const onChangeHandler = useCallback((value: string) => {
    userInput.current = value;
  }, []);

  const runPy = async () => {
    const inputCode = `def print(value):
  return value
${userInput.current}
`;

    console.log('user input', userInput.current);

    setOutPut(inputCode);
    runPython(userInput.current);
  };

  const runJS = useCallback((e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'p') {
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
    }

    // format the code
    if (e.shiftKey && e.key.toLowerCase() === 'f') {
      e.preventDefault();
      formatJS(userInput.current);
    }
  }, []);

  const formatJS = (code: string) => {
    const formatted = prettier
      .format(code, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    setCodeValue(formatted);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      runPython(userInput.current);
    }
  };

  // const packages = {
  //   micropip: ['matplotlib', 'numpy'],
  // };
  const packages = {
    official: ['asciitree'],
    micropip: ['python-cowsay'],
  };

  return (
    <PythonProvider packages={packages}>
      <div className="code-cell" onKeyDown={handleKeyPress}>
        <div className="controls">
          <button
            className="run-code-btn"
            onClick={() => runPython(userInput.current)}
          >
            <BsFillPlayFill size={20} color="slateblue" />
          </button>
        </div>

        <div className="container">
          <CodeEditor
            onChange={onChangeHandler}
            initialValue={codeValue}
            language="py"
          />
          <OutputPreview output={stdout} err={stderr} language="py" />
        </div>
      </div>
    </PythonProvider>
  );
};

export default CodeCell;
