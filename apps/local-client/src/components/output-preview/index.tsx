import './output-preview.css';

interface PreviewProps {
  output: string;
  err: string;
  language: 'py' | 'js';
}

const OutputPreview: React.FC<PreviewProps> = ({ output, err, language }) => {
  console.log({ output, err });

  return (
    <div className="preview-wrapper">
      <pre className="preview">
        <code>{output}</code>
        {err && <div className="preview-error">{err}</div>}

        <iframe srcDoc={pyDoc} sandbox="allow-scripts" className='output'></iframe>
      </pre>
    </div>
  );
};

export default OutputPreview;

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


const pyDoc = `
<html>
<head>
  <title>Demo</title>
  <script src="https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js"></script>
  <style>
      
    ::-webkit-scrollbar {
      display: none;
      } 
      body {
        display: flex;
        align-items:stretch;
        height:100%;
      }
  </style>
</head>
<body></body>
<script type="text/javascript" defer>
  async function main() {
    let pyodide = await loadPyodide();
    console.log(
      pyodide.runPython(\`
    import sys
    sys.version
\`)
    );
    await pyodide.loadPackage('matplotlib');
    pyodide.runPython(\`
import matplotlib
import numpy as np

matplotlib.use("module://matplotlib.backends.html5_canvas_backend")
import matplotlib.cm as cm
from matplotlib import pyplot as plt
delta = 0.025
x = y = np.arange(-3.0, 3.0, delta)
X, Y = np.meshgrid(x, y)
Z1 = np.exp(-(X**2) - Y**2)
Z2 = np.exp(-((X - 1) ** 2) - (Y - 1) ** 2)
Z = (Z1 - Z2) * 2
plt.figure()
plt.imshow(
Z,
interpolation="bilinear",
cmap=cm.RdYlGn,
origin="lower",
extent=[-3, 3, -3, 3],
vmax=abs(Z).max(),
vmin=-abs(Z).max(),
)
plt.show()
\`);
  }
  main();
</script>

<script>
  document.querySelector('body').height = document.querySelector('canvas')?.height || 100;
</script>
<html></html>
</html>
`