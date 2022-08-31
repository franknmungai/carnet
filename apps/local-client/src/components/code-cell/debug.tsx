import { loadPyodide, PyodideInterface } from 'pyodide';
import { useEffect, useRef } from 'react';

export const App = () => {
  const pyodideRef = useRef<PyodideInterface>();

  useEffect(() => {
    (async () => {
      // Throws a "module not found" error
      pyodideRef.current = await loadPyodide({
        indexURL: '/static/js',

        // Some other alternatives I've tried
        // indexURL: '../../pyodide' -> relative import to folder containing pyodide.wasm.js
        //indexURL: 'require.resolve('pyodide-wasm')'
      });
    })();
  });
  return <div></div>;
};
