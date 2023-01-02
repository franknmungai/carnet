import { useEffect, useRef } from 'react';
import './output-preview.css';

interface PreviewProps {
  output: string;
  err: string;
  language: 'py' | 'js';
}

const html = `
    <html>
      <head>
        <style>html { background-color: rgba(240, 240, 240); font-family: Consolas } body { width: '100%' } </style>
      <script src="https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js"></script>
      <script>
        async function main() {
          let pyodide = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/',
          });
          console.log(
            pyodide.runPython("print('Hello, world from the browser!')")
          );
          window.pyodide = pyodide;
        }
        main();
      </script>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              console.log('code -> ' + event.data);
              console.log(window.pyodide.runPython(event.data));

            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const OutputPreview: React.FC<PreviewProps> = ({ output, err, language }) => {
  const iframe = useRef<any>();

  // useEffect(() => {
  //   if (language === 'js') {
  //     iframe.current.srcdoc = jsDoc;
  //     setTimeout(() => {
  //       iframe.current.contentWindow.postMessage(output, '*');
  //     }, 50);
  //   }

  //   iframe.current.contentWindow.postMessage(output, '*');
  // }, [output]);

  console.log(output);

  const pyDoc = `
  <html>
    <head>
      <style>
        #output, #err { font-family: "Consolas"; font-size: 13.5px; }
        #err { color: 'red'; }
      </style>
      <script src="https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js"></script>
    </head>

    <body>
      <div id="output"></div>
      <div id="err">${err}</div>
    </body>

    <script>
    const output = document.getElementById('output');

    function addToOutput(s) {
      output.value = '>>>  ' + s + '\n';
    }

    output.value = 'Initializing...\n';
    // init Pyodide
    async function main() {
      let pyodide = await loadPyodide();
      output.value += 'Ready!\n';
      return pyodide;
    }
    let pyodideReadyPromise = main();

    async function evaluatePython() {
      // Polyfill print
      const inputCode = ${`
def print(val):
  return val
${output}
    `};
      // console.log('code: ' + code.value);
      let pyodide = await pyodideReadyPromise;
      try {
        let output = pyodide.runPython(inputCode);

        addToOutput(output);
      } catch (err) {
        addToOutput(err);
      }
    }
  </script>
  </html>
  `;

  const jsDoc = `
  <html>
    <head>
      <style>#root { font-family: "Consolas"; font-size: 14px; }</style>
    </head>
    <body>
      <div id="root"></div>

      <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        };

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        });

        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        }, false);
      </script>
    </body>
</html>
`;

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        style={{ border: 'none' }}
        srcDoc={pyDoc}
        className="preview"
        // height={500}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default OutputPreview;
