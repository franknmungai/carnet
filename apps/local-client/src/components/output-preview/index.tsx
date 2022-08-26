import { useRef } from 'react';
import './output-preview.css';

interface PreviewProps {
  code: string;
  err: string;
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

const OutputPreview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  // useEffect(() => {
  //   iframe.current.srcdoc = html;
  //   setTimeout(() => {
  //     iframe.current.contentWindow.postMessage(code, '*');
  //   }, 50);
  // }, [code]);

  const srcDoc = `
  <html>
    <head>
      <link rel="stylesheet" href="https://pyscript.net/alpha/pyscript.css" />
      <script defer src="https://pyscript.net/alpha/pyscript.js"></script>
    </head>
    <body>
        <py-script output="plot">${code}</py-script>
        <py-env>
          - numpy
          - pandas
          - matplotlib
        </py-env>
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
        srcDoc={srcDoc}
        width={600}
        height={300}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default OutputPreview;
