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
      {/* <iframe
        title="preview"
        // ref={iframe}
        sandbox="allow-scripts"
        style={{ border: 'none' }}
        srcDoc={output}
        className="preview"
        // height={500}
      /> */}
      <div className="preview">{output}</div>
      {err && <div className="preview-error">{err}</div>}
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
